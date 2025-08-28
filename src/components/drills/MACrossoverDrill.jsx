import React, { useMemo, useState } from 'react';

/**
 * MACrossoverDrill
 * - Simple MA crossover drill with adjustable short/long windows
 * - Renders signals + a tiny SVG line for price and MAs
 * - No external deps beyond React; works in SSR
 */
const DEFAULT_PRICES = [100,101,102,103,102,101,102,104,106,105,107,108,109,107,106,108,110,111,112,111,113,115,114];

function sma(arr, window) {
  if (window <= 0) return [];
  const out = [];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= window) sum -= arr[i - window];
    out.push(i >= window - 1 ? sum / window : null);
  }
  return out;
}

function normalizeSeries(series) {
  const vals = series.filter(v => v != null);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  if (!isFinite(min) || !isFinite(max) || max === min) return series.map(() => 0.5);
  return series.map(v => (v == null ? null : (v - min) / (max - min)));
}

function polylinePath(series, w, h, pad = 8) {
  const usableW = w - pad * 2;
  const usableH = h - pad * 2;
  const n = series.length;
  if (n === 0) return '';
  const norm = normalizeSeries(series);
  let d = '';
  for (let i = 0; i < n; i++) {
    const yv = norm[i];
    if (yv == null) continue;
    const x = pad + (i / (n - 1)) * usableW;
    const y = pad + (1 - yv) * usableH;
    d += (d ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}

export default function MACrossoverDrill() {
  const [prices] = useState(DEFAULT_PRICES);
  const [shortWin, setShortWin] = useState(5);
  const [longWin, setLongWin]  = useState(12);

  const { shortMA, longMA, signals } = useMemo(() => {
    const s = sma(prices, shortWin);
    const l = sma(prices, longWin);
    const sigs = [];
    let prev = null;

    for (let i = 0; i < prices.length; i++) {
      const a = s[i], b = l[i];
      let cross = null;
      if (a != null && b != null) {
        if (prev != null) {
          if (prev <= 0 && a - b > 0) cross = 'BUY';
          if (prev >= 0 && a - b < 0) cross = 'SELL';
        }
        prev = a - b;
      } else {
        prev = prev; // unchanged
      }
      if (cross) sigs.push({ idx: i, type: cross, price: prices[i] });
    }
    return { shortMA: s, longMA: l, signals: sigs };
  }, [prices, shortWin, longWin]);

  const W = 520, H = 140;

  return (
    <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">MA Crossover Drill</h3>
        <p className="text-sm text-gray-500">Practice identifying simple moving-average crossovers.</p>
      </div>

      <div className="flex gap-4 items-end mb-4">
        <label className="text-sm">
          Short MA
          <input
            type="number"
            min={2}
            max={prices.length}
            value={shortWin}
            onChange={(e) => setShortWin(Math.max(2, Math.min(prices.length, Number(e.target.value) || 2)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent"
          />
        </label>
        <label className="text-sm">
          Long MA
          <input
            type="number"
            min={3}
            max={prices.length}
            value={longWin}
            onChange={(e) => setLongWin(Math.max(3, Math.min(prices.length, Number(e.target.value) || 3)))}
            className="ml-2 w-20 rounded border px-2 py-1 bg-transparent"
          />
        </label>
      </div>

      <svg className="w-full" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="MA crossover chart">
        {/* grid */}
        <rect x="0" y="0" width={W} height={H} fill="none" />
        {/* price */}
        <path d={polylinePath(prices, W, H)} fill="none" stroke="currentColor" opacity="0.45" strokeWidth="1.5" />
        {/* short MA */}
        <path d={polylinePath(shortMA, W, H)} fill="none" stroke="currentColor" opacity="0.9" strokeWidth="1.5" />
        {/* long MA */}
        <path d={polylinePath(longMA, W, H)} fill="none" stroke="currentColor" opacity="0.9" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* signals */}
        {signals.map(s => {
          const norm = normalizeSeries(prices);
          const x = 8 + (s.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - norm[s.idx]) * (H - 16);
          return (
            <g key={s.idx}>
              <circle cx={x} cy={y} r="3.5" fill="currentColor" />
              <text x={x + 6} y={y - 6} fontSize="10" className="fill-current">{s.type}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4">
        <h4 className="font-medium mb-2 text-sm">Signals</h4>
        {signals.length === 0 ? (
          <div className="text-sm text-gray-500">No crossovers with the current windows.</div>
        ) : (
          <ul className="text-sm space-y-1">
            {signals.map(s => (
              <li key={s.idx}>
                <span className={s.type === 'BUY' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {s.type}
                </span>
                {' '}@ index {s.idx} (price {s.price.toFixed ? s.price.toFixed(2) : s.price})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
