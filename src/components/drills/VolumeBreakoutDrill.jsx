import React, { useMemo, useState } from 'react';

/**
 * VolumeBreakoutDrill
 * - Breakout when close > recent High (or < recent Low)
 * - Confirmed when Volume > SMA(volume)*multiplier
 * - Pure React + inline SVG; SSR-safe
 */

// Demo series (same length)
const DEFAULT_PRICES = [
  100,101,102,101,103,104,103,105,106,105,104,106,108,107,109,111,110,112,111,113,
  114,113,112,114,116,117,116,118,117,119,121,120,122,121,123,124,123,125,127,126
];
const DEFAULT_VOLUME = [
  10,11,12,11,13,14,13,15,16,15,14,16,18,17,19,21,20,22,21,23,
  24,23,22,24,26,27,26,28,27,29,31,30,32,31,33,34,33,35,40,28
];

// ---- helpers ----
function sma(arr, n) {
  const out = new Array(arr.length).fill(null);
  if (n <= 0) return out;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= n) sum -= arr[i - n];
    out[i] = i >= n - 1 ? sum / n : null;
  }
  return out;
}

function rollingHigh(arr, n) {
  const out = new Array(arr.length).fill(null);
  for (let i = 0; i < arr.length; i++) {
    if (i < n - 1) continue;
    let hi = -Infinity;
    for (let k = i - n + 1; k <= i; k++) hi = Math.max(hi, arr[k]);
    out[i] = hi;
  }
  return out;
}
function rollingLow(arr, n) {
  const out = new Array(arr.length).fill(null);
  for (let i = 0; i < arr.length; i++) {
    if (i < n - 1) continue;
    let lo = Infinity;
    for (let k = i - n + 1; k <= i; k++) lo = Math.min(lo, arr[k]);
    out[i] = lo;
  }
  return out;
}

function norm(series) {
  const vals = series.filter(v => v != null);
  const min = Math.min(...vals), max = Math.max(...vals);
  if (!isFinite(min) || !isFinite(max) || max === min) return series.map(v => (v == null ? null : 0.5));
  return series.map(v => (v == null ? null : (v - min) / (max - min)));
}

function pathFromSeries(series, W, H, pad = 8) {
  const n = series.length;
  if (!n) return '';
  const usableW = W - pad * 2, usableH = H - pad * 2;
  const ns = norm(series);
  let d = '';
  for (let i = 0; i < n; i++) {
    const yv = ns[i];
    if (yv == null) continue;
    const x = pad + (i / (n - 1)) * usableW;
    const y = pad + (1 - yv) * usableH;
    d += (d ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}

// ---- component ----
export default function VolumeBreakoutDrill() {
  const [prices] = useState(DEFAULT_PRICES);
  const [volume] = useState(DEFAULT_VOLUME);

  const [rangeLen, setRangeLen] = useState(14);   // price lookback for range
  const [volLen, setVolLen]     = useState(10);   // volume SMA window
  const [volMult, setVolMult]   = useState(1.5);  // spike threshold multiplier

  const {
    hi, lo, volSma, signals
  } = useMemo(() => {
    const hi = rollingHigh(prices, rangeLen);
    const lo = rollingLow(prices, rangeLen);
    const volSma = sma(volume, volLen);

    const signals = []; // { idx, type:'BREAK↑'|'BREAK↓', price, vol, reason }
    for (let i = 0; i < prices.length; i++) {
      const close = prices[i];
      const H = hi[i], L = lo[i];
      const v = volume[i], vs = volSma[i];

      if (H != null && L != null && vs != null) {
        const volSpike = v > vs * volMult;
        const breakoutUp = close > H;
        const breakoutDn = close < L;
        if (volSpike && breakoutUp) {
          signals.push({ idx: i, type: 'BREAK↑', price: close, vol: v, reason: `vol ${v.toFixed(1)} > ${volMult}×SMA(${volLen})` });
        } else if (volSpike && breakoutDn) {
          signals.push({ idx: i, type: 'BREAK↓', price: close, vol: v, reason: `vol ${v.toFixed(1)} > ${volMult}×SMA(${volLen})` });
        }
      }
    }
    return { hi, lo, volSma, signals };
  }, [prices, volume, rangeLen, volLen, volMult]);

  const W = 640, H1 = 160, H2 = 100;

  // price domain for mapping range bands
  const minP = Math.min(...prices), maxP = Math.max(...prices);

  return (
    <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Volume Breakout Drill</h3>
        <p className="text-sm text-gray-500">Breakouts of a recent range, confirmed by volume spikes.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <label className="text-sm">Range lookback
          <input
            type="number" min={5} max={30} value={rangeLen}
            onChange={(e)=> setRangeLen(Math.max(5, Math.min(30, Number(e.target.value) || 14)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent"
          />
        </label>
        <label className="text-sm">Volume SMA
          <input
            type="number" min={3} max={30} value={volLen}
            onChange={(e)=> setVolLen(Math.max(3, Math.min(30, Number(e.target.value) || 10)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent"
          />
        </label>
        <label className="text-sm">Vol multiplier
          <input
            type="number" step="0.1" min={1.0} max={3.0} value={volMult}
            onChange={(e)=> setVolMult(Math.max(1.0, Math.min(3.0, Number(e.target.value) || 1.5)))}
            className="ml-2 w-24 rounded border px-2 py-1 bg-transparent"
          />
        </label>
      </div>

      {/* Price panel */}
      <svg className="w-full mb-4" viewBox={`0 0 ${W} ${H1}`} role="img" aria-label="Price with range & breakouts">
        <rect x="0" y="0" width={W} height={H1} fill="none" />
        {/* price line */}
        <path d={pathFromSeries(prices, W, H1)} fill="none" stroke="currentColor" strokeWidth="1.6" />

        {/* rolling range (high/low bands) */}
        {hi.map((_, i) => {
          if (hi[i] == null || lo[i] == null) return null;
          // map price -> y
          const yFromP = (p) => 8 + (1 - (p - minP) / ((maxP - minP) || 1)) * (H1 - 16);
          const x = 8 + (i / (hi.length - 1)) * (W - 16);
          return (
            <g key={`r-${i}`}>
              <line x1={x} x2={x} y1={yFromP(hi[i])} y2={yFromP(lo[i])} stroke="currentColor" opacity="0.1" />
            </g>
          );
        })}

        {/* breakout markers */}
        {signals.map(s => {
          const ns = norm(prices);
          const x = 8 + (s.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[s.idx]) * (H1 - 16);
          return (
            <g key={`b-${s.idx}`}>
              <circle cx={x} cy={y} r="3.5" fill="currentColor" />
              <text x={x + 6} y={y - 6} fontSize="10" className="fill-current">{s.type}</text>
            </g>
          );
        })}
      </svg>

      {/* Volume panel */}
      <svg className="w-full" viewBox={`0 0 ${W} ${H2}`} role="img" aria-label="Volume with SMA">
        <rect x="0" y="0" width={W} height={H2} fill="none" />
        {/* bars */}
        {volume.map((v, i) => {
          const ns = norm(volume);
          const x = 8 + (i / (volume.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[i]) * (H2 - 16);
          return <line key={`v-${i}`} x1={x} x2={x} y1={H2 - 8} y2={y} stroke="currentColor" opacity="0.35" />;
        })}
        {/* SMA line */}
        <path d={pathFromSeries(volSma, W, H2)} fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>

      {/* Signals list */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Breakout Signals</h4>
        {signals.length === 0 ? (
          <div className="text-sm text-gray-500">No volume-confirmed breakouts with current settings.</div>
        ) : (
          <ul className="text-sm space-y-1">
            {signals.map(s => (
              <li key={`sl-${s.idx}`}>
                {s.type} @ index {s.idx} (price {s.price.toFixed ? s.price.toFixed(2) : s.price}) — {s.reason}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
