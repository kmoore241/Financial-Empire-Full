import React, { useMemo, useState } from 'react';

/** ---- sample data ---- */
const DEFAULT_PRICES = [100,101,102,103,102,101,102,104,106,105,107,108,109,107,106,108,110,111,112,111,113,115,114,116,117,116,118,119,118,120,121,120,122];

/** ---- math helpers ---- */
function sma(arr, n) {
  const out = [];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= n) sum -= arr[i - n];
    out.push(i >= n - 1 ? sum / n : null);
  }
  return out;
}

function ema(arr, n) {
  const out = [];
  const k = 2 / (n + 1);
  let prev = null;
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (v == null) { out.push(null); continue; }
    if (prev == null) {
      // seed with SMA
      if (i < n - 1) { out.push(null); continue; }
      const seed = sma(arr.slice(0, i + 1), n)[i];
      prev = seed;
      out.push(seed);
    } else {
      const next = v * k + prev * (1 - k);
      out.push(next);
      prev = next;
    }
  }
  return out;
}

function rsi(prices, period = 14) {
  const out = new Array(prices.length).fill(null);
  if (prices.length < period + 1) return out;

  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const ch = prices[i] - prices[i - 1];
    if (ch >= 0) gain += ch; else loss -= ch;
  }
  let avgGain = gain / period;
  let avgLoss = loss / period;
  out[period] = avgLoss === 0 ? 100 : 100 - (100 / (1 + (avgGain / avgLoss)));

  for (let i = period + 1; i < prices.length; i++) {
    const ch = prices[i] - prices[i - 1];
    const g = Math.max(0, ch);
    const l = Math.max(0, -ch);
    avgGain = (avgGain * (period - 1) + g) / period;
    avgLoss = (avgLoss * (period - 1) + l) / period;
    out[i] = avgLoss === 0 ? 100 : 100 - (100 / (1 + (avgGain / avgLoss)));
  }
  return out;
}

function macd(prices, fast = 12, slow = 26, signal = 9) {
  const emaFast = ema(prices, fast);
  const emaSlow = ema(prices, slow);
  const macdLine = prices.map((_, i) =>
    emaFast[i] != null && emaSlow[i] != null ? emaFast[i] - emaSlow[i] : null
  );
  const signalLine = ema(macdLine, signal);
  const histogram = macdLine.map((v, i) =>
    v != null && signalLine[i] != null ? v - signalLine[i] : null
  );
  return { macdLine, signalLine, histogram };
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

/** ---- component ---- */
export default function RSIMACDDrill() {
  const [prices] = useState(DEFAULT_PRICES);
  const [rsiLen, setRsiLen] = useState(14);
  const [fast, setFast] = useState(12);
  const [slow, setSlow] = useState(26);
  const [sig, setSig]   = useState(9);

  const { rsiVals, macdLine, signalLine, histogram, rsiSignals, macdSignals } = useMemo(() => {
    const r = rsi(prices, rsiLen);
    const { macdLine, signalLine, histogram } = macd(prices, fast, slow, sig);

    // RSI signals: cross above 70 (overbought) / below 30 (oversold)
    const rsiSignals = [];
    for (let i = 1; i < r.length; i++) {
      if (r[i - 1] != null && r[i] != null) {
        if (r[i - 1] <= 70 && r[i] > 70) rsiSignals.push({ idx: i, type: 'RSI>70' });
        if (r[i - 1] >= 30 && r[i] < 30) rsiSignals.push({ idx: i, type: 'RSI<30' });
      }
    }

    // MACD signals: line crosses signal
    const macdSignals = [];
    for (let i = 1; i < macdLine.length; i++) {
      const a0 = macdLine[i - 1], b0 = signalLine[i - 1];
      const a1 = macdLine[i],     b1 = signalLine[i];
      if (a0 == null || b0 == null || a1 == null || b1 == null) continue;
      const prev = a0 - b0, cur = a1 - b1;
      if (prev <= 0 && cur > 0) macdSignals.push({ idx: i, type: 'MACD↑' });
      if (prev >= 0 && cur < 0) macdSignals.push({ idx: i, type: 'MACD↓' });
    }

    return { rsiVals: r, macdLine, signalLine, histogram, rsiSignals, macdSignals };
  }, [prices, rsiLen, fast, slow, sig]);

  const W = 560, H1 = 140, H2 = 120;

  return (
    <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">RSI + MACD Drill</h3>
        <p className="text-sm text-gray-500">Practice reading RSI zones and MACD crossovers.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end mb-4">
        <label className="text-sm">RSI
          <input type="number" min={2} max={50} value={rsiLen}
            onChange={e => setRsiLen(Math.max(2, Math.min(50, Number(e.target.value) || 14)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent" />
        </label>
        <label className="text-sm">MACD Fast
          <input type="number" min={2} max={50} value={fast}
            onChange={e => setFast(Math.max(2, Math.min(50, Number(e.target.value) || 12)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent" />
        </label>
        <label className="text-sm">MACD Slow
          <input type="number" min={3} max={100} value={slow}
            onChange={e => setSlow(Math.max(3, Math.min(100, Number(e.target.value) || 26)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent" />
        </label>
        <label className="text-sm">Signal
          <input type="number" min={2} max={50} value={sig}
            onChange={e => setSig(Math.max(2, Math.min(50, Number(e.target.value) || 9)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent" />
        </label>
      </div>

      {/* RSI */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">RSI ({rsiLen})</span>
        </div>
        <svg className="w-full" viewBox={`0 0 ${W} ${H1}`} role="img" aria-label="RSI">
          {/* bands */}
          <rect x="0" y="0" width={W} height={H1} fill="none" />
          <line x1="0" y1={H1*0.3} x2={W} y2={H1*0.3} stroke="currentColor" opacity="0.15" />
          <line x1="0" y1={H1*0.7} x2={W} y2={H1*0.7} stroke="currentColor" opacity="0.15" />
          {/* rsi */}
          <path d={pathFromSeries(rsiVals, W, H1)} fill="none" stroke="currentColor" strokeWidth="1.5" />

          {/* markers */}
          {rsiSignals.map(s => {
            const ns = norm(rsiVals);
            const x = 8 + (s.idx / (rsiVals.length - 1)) * (W - 16);
            const y = 8 + (1 - ns[s.idx]) * (H1 - 16);
            return (
              <g key={`r${s.idx}`}>
                <circle cx={x} cy={y} r="3" fill="currentColor" />
                <text x={x + 6} y={y - 6} fontSize="10" className="fill-current">{s.type}</text>
              </g>
            );
          })}
        </svg>
        <div className="text-xs text-gray-500 mt-1">Bands at 70 / 30</div>
      </div>

      {/* MACD */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">MACD ({fast},{slow},{sig})</span>
        </div>
        <svg className="w-full" viewBox={`0 0 ${W} ${H2}`} role="img" aria-label="MACD">
          <rect x="0" y="0" width={W} height={H2} fill="none" />
          {/* histogram (bars) */}
          {histogram.map((v, i) => {
            if (v == null) return null;
            const ns = norm(histogram);
            const x = 8 + (i / (histogram.length - 1)) * (W - 16);
            const zeroY = H2 / 2;
            const y = 8 + (1 - ns[i]) * (H2 - 16);
            return (
              <line key={`h${i}`} x1={x} x2={x} y1={zeroY} y2={y} stroke="currentColor" opacity="0.25" />
            );
          })}
          {/* macd & signal lines */}
          <path d={pathFromSeries(macdLine, W, H2)} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d={pathFromSeries(signalLine, W, H2)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* cross markers */}
          {macdSignals.map(s => {
            const ns = norm(macdLine);
            const x = 8 + (s.idx / (macdLine.length - 1)) * (W - 16);
            const y = 8 + (1 - ns[s.idx]) * (H2 - 16);
            return (
              <g key={`m${s.idx}`}>
                <circle cx={x} cy={y} r="3" fill="currentColor" />
                <text x={x + 6} y={y - 6} fontSize="10" className="fill-current">{s.type}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Signals list */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2">RSI Signals</h4>
          {rsiSignals.length === 0 ? (
            <div className="text-sm text-gray-500">No RSI events.</div>
          ) : (
            <ul className="text-sm space-y-1">
              {rsiSignals.map(s => <li key={`rl${s.idx}`}>{s.type} @ index {s.idx}</li>)}
            </ul>
          )}
        </div>
        <div>
          <h4 className="font-medium text-sm mb-2">MACD Signals</h4>
          {macdSignals.length === 0 ? (
            <div className="text-sm text-gray-500">No MACD crossovers.</div>
          ) : (
            <ul className="text-sm space-y-1">
              {macdSignals.map(s => <li key={`ml${s.idx}`}>{s.type} @ index {s.idx}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
