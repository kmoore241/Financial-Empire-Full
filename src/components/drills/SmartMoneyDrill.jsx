import React, { useMemo, useState } from 'react';

/**
 * SmartMoneyDrill
 * - Lightweight SMC practice: swings, BOS/CHOCH, liquidity sweeps.
 * - Pure React + inline SVG; no external libs.
 */

// demo price series (close)
const DEFAULT_PRICES = [
  100,101,102,101,103,104,103,105,106,105,104,106,108,107,109,111,110,112,111,113,114,113,112,114,116,117,116,118,117,119,121,120,122,121,123
];

// ----- helpers -----
function findSwings(arr, lookback = 2) {
  // very simple swing high/low logic
  const swings = []; // {idx, type:'H'|'L', price}
  for (let i = lookback; i < arr.length - lookback; i++) {
    const v = arr[i];
    let isHigh = true, isLow = true;
    for (let k = 1; k <= lookback; k++) {
      if (!(v > arr[i - k] && v > arr[i + k])) isHigh = false;
      if (!(v < arr[i - k] && v < arr[i + k])) isLow = false;
      if (!isHigh && !isLow) break;
    }
    if (isHigh) swings.push({ idx: i, type: 'H', price: v });
    else if (isLow) swings.push({ idx: i, type: 'L', price: v });
  }
  return swings;
}

function lastOfType(swings, type, beforeIdx) {
  for (let i = swings.length - 1; i >= 0; i--) {
    const s = swings[i];
    if (s.type === type && s.idx < beforeIdx) return s;
  }
  return null;
}

function detectSMCSignals(prices, swings) {
  // BOS/CHOCH: naive approach
  const sigs = []; // {idx, type:'BOS↑'|'BOS↓'|'CHOCH↑'|'CHOCH↓'|'SWEEP↑'|'SWEEP↓'}
  let regime = 'sideways'; // 'bull' | 'bear' | 'sideways'

  for (let i = 3; i < prices.length; i++) {
    const close = prices[i];

    const prevHigh = lastOfType(swings, 'H', i)?.price;
    const prevLow  = lastOfType(swings, 'L', i)?.price;

    // liquidity grabs (sweep: poke previous level then close back inside)
    if (prevHigh != null) {
      const sweptUp = prices[i-1] > prevHigh && close < prevHigh;
      if (sweptUp) sigs.push({ idx: i, type: 'SWEEP↑' });
    }
    if (prevLow != null) {
      const sweptDn = prices[i-1] < prevLow && close > prevLow;
      if (sweptDn) sigs.push({ idx: i, type: 'SWEEP↓' });
    }

    // BOS (close breaks previous swing level in trend direction)
    if (prevHigh != null && close > prevHigh) {
      // if you were bear or sideways, flipping to bull might be CHOCH
      if (regime !== 'bull') {
        sigs.push({ idx: i, type: 'CHOCH↑' });
        regime = 'bull';
      } else {
        sigs.push({ idx: i, type: 'BOS↑' });
      }
    }
    if (prevLow != null && close < prevLow) {
      if (regime !== 'bear') {
        sigs.push({ idx: i, type: 'CHOCH↓' });
        regime = 'bear';
      } else {
        sigs.push({ idx: i, type: 'BOS↓' });
      }
    }
  }
  return sigs;
}

function normalize(series) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  if (!isFinite(min) || !isFinite(max) || max === min) return series.map(() => 0.5);
  return series.map(v => (v - min) / (max - min));
}

function path(series, W, H, pad = 8) {
  const n = series.length;
  if (!n) return '';
  const xw = W - pad * 2, yh = H - pad * 2;
  const ns = normalize(series);
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = pad + (i / (n - 1)) * xw;
    const y = pad + (1 - ns[i]) * yh;
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}

// ----- component -----
export default function SmartMoneyDrill() {
  const [prices] = useState(DEFAULT_PRICES);
  const [swingLookback, setSwingLookback] = useState(2);
  const [showSwings, setShowSwings] = useState(true);

  const { swings, signals } = useMemo(() => {
    const swings = findSwings(prices, swingLookback);
    const signals = detectSMCSignals(prices, swings);
    return { swings, signals };
  }, [prices, swingLookback]);

  const W = 640, H = 200;

  return (
    <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Smart Money Drill (BOS / CHOCH / Sweeps)</h3>
        <p className="text-sm text-gray-500">Practice identifying basic structure breaks and liquidity grabs.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <label className="text-sm">
          Swing lookback
          <input
            type="number"
            min={1}
            max={6}
            value={swingLookback}
            onChange={e => setSwingLookback(Math.max(1, Math.min(6, Number(e.target.value) || 2)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent"
          />
        </label>
        <label className="text-sm inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={showSwings}
            onChange={e => setShowSwings(e.target.checked)}
          />
          Show swings
        </label>
      </div>

      {/* Chart */}
      <svg className="w-full" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="SMC chart">
        <rect x="0" y="0" width={W} height={H} fill="none" />
        {/* price path */}
        <path d={path(prices, W, H)} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />

        {/* swing points */}
        {showSwings && swings.map(s => {
          const ns = normalize(prices);
          const x = 8 + (s.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[s.idx]) * (H - 16);
          const up = s.type === 'H';
          return (
            <g key={`sw-${s.idx}`}>
              <circle cx={x} cy={y} r="3.5" fill="currentColor" opacity="0.8" />
              <text x={x + 6} y={y - (up ? 6 : -6)} fontSize="10" className="fill-current">
                {s.type}
              </text>
            </g>
          );
        })}

        {/* signals */}
        {signals.map(sig => {
          const ns = normalize(prices);
          const x = 8 + (sig.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[sig.idx]) * (H - 16);
          return (
            <g key={`sg-${sig.idx}`}>
              <rect x={x - 5} y={y - 10} width="10" height="10" fill="currentColor" />
              <text x={x + 8} y={y - 12} fontSize="10" className="fill-current">{sig.type}</text>
            </g>
          );
        })}
      </svg>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Structure signals</h4>
          {signals.length === 0 ? (
            <div className="text-sm text-gray-500">No BOS/CHOCH or sweeps in this sample.</div>
          ) : (
            <ul className="text-sm space-y-1">
              {signals.map(s => <li key={`li-${s.idx}`}>{s.type} at index {s.idx}</li>)}
            </ul>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Swings</h4>
          {swings.length === 0 ? (
            <div className="text-sm text-gray-500">No swings detected with lookback {swingLookback}.</div>
          ) : (
            <ul className="text-sm space-y-1">
              {swings.map(sw => <li key={`sl-${sw.idx}`}>{sw.type} @ idx {sw.idx} (price {prices[sw.idx]})</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
