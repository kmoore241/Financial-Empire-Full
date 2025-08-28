import React, { useMemo, useState } from 'react';

/**
 * SupportResistanceDrill
 * - Minimal SR practice tool:
 *   • auto-detect swing highs/lows → suggested S/R levels
 *   • user can add/remove custom levels
 *   • marks "TOUCH" (price near level) and "BREAK" (close beyond)
 * - Pure React + inline SVG; safe for SSR.
 */

// Demo price series (close)
const DEFAULT_PRICES = [
  100,101,103,102,104,106,105,107,108,107,106,109,111,112,111,113,112,114,116,115,
  117,118,117,119,121,120,122,121,123,124,123,125,126,127,126,128
];

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

// Simple swing finder (lookback bars on each side)
function findSwings(arr, lookback = 2) {
  const highs = [], lows = [];
  for (let i = lookback; i < arr.length - lookback; i++) {
    const v = arr[i];
    let hi = true, lo = true;
    for (let k = 1; k <= lookback; k++) {
      if (!(v > arr[i - k] && v > arr[i + k])) hi = false;
      if (!(v < arr[i - k] && v < arr[i + k])) lo = false;
      if (!hi && !lo) break;
    }
    if (hi) highs.push({ idx: i, price: v });
    else if (lo) lows.push({ idx: i, price: v });
  }
  return { highs, lows };
}

// Cluster swing prices into unique-ish levels (merge if within tolerance)
function clusterLevels(points, tolerance = 0.5) {
  const sorted = [...points].sort((a,b)=>a.price-b.price);
  const clusters = [];
  for (const p of sorted) {
    const last = clusters[clusters.length - 1];
    if (!last || Math.abs(last.price - p.price) > tolerance) {
      clusters.push({ price: p.price, count: 1 });
    } else {
      last.price = (last.price * last.count + p.price) / (last.count + 1);
      last.count += 1;
    }
  }
  return clusters.map(c => Number(c.price.toFixed(2)));
}

// Detect touches and breaks vs. levels
function detectEvents(prices, levels, touchPct = 0.3) {
  const events = []; // {idx, type:'TOUCH'|'BREAK↑'|'BREAK↓', level, price}
  if (!prices.length || !levels.length) return events;

  const min = Math.min(...prices), max = Math.max(...prices);
  const span = max - min || 1;
  const tolAbs = span * (touchPct / 100); // touchPct is percentage (0.3% default)

  for (let i = 1; i < prices.length; i++) {
    const prev = prices[i - 1], cur = prices[i];
    for (const L of levels) {
      // TOUCH: price close to L (abs distance ≤ tolAbs)
      if (Math.abs(cur - L) <= tolAbs) {
        events.push({ idx: i, type: 'TOUCH', level: L, price: cur });
      }
      // BREAK: cross above/below between prev and cur
      const crossedUp = prev <= L && cur > L;
      const crossedDn = prev >= L && cur < L;
      if (crossedUp) events.push({ idx: i, type: 'BREAK↑', level: L, price: cur });
      if (crossedDn) events.push({ idx: i, type: 'BREAK↓', level: L, price: cur });
    }
  }
  return events;
}

export default function SupportResistanceDrill() {
  const [prices] = useState(DEFAULT_PRICES);
  const [lookback, setLookback] = useState(2);
  const [touchPct, setTouchPct] = useState(0.3); // percentage of total range
  const [customLevel, setCustomLevel] = useState('');
  const [levels, setLevels] = useState([]); // user levels
  const [useAuto, setUseAuto] = useState(true);

  const { suggested, swings } = useMemo(() => {
    const sw = findSwings(prices, lookback);
    const sLevels = [
      ...clusterLevels(sw.highs.map(h => ({ price: h.price })), /*tol*/ 0.6),
      ...clusterLevels(sw.lows .map(l => ({ price: l.price })), 0.6),
    ];
    // dedupe suggestions
    const dedup = Array.from(new Set(sLevels.map(v => v.toFixed(2)))).map(Number);
    return { suggested: dedup, swings: sw };
  }, [prices, lookback]);

  const activeLevels = useMemo(() => {
    const merged = new Set([
      ...(useAuto ? suggested : []),
      ...levels.map(Number)
    ]);
    return Array.from(merged).sort((a,b)=>a-b);
  }, [suggested, levels, useAuto]);

  const events = useMemo(
    () => detectEvents(prices, activeLevels, touchPct),
    [prices, activeLevels, touchPct]
  );

  const W = 640, H = 220;

  const addLevel = () => {
    const v = Number(customLevel);
    if (!isFinite(v)) return;
    setLevels(prev => Array.from(new Set([...prev, Number(v.toFixed(2))])));
    setCustomLevel('');
  };

  const removeLevel = (v) => {
    setLevels(prev => prev.filter(x => Number(x) !== Number(v)));
  };

  return (
    <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Support & Resistance Drill</h3>
        <p className="text-sm text-gray-500">Identify touches and breaks around key horizontal levels.</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="text-sm">
          Swing lookback
          <input
            type="number"
            min={1}
            max={6}
            value={lookback}
            onChange={e => setLookback(Math.max(1, Math.min(6, Number(e.target.value) || 2)))}
            className="ml-2 w-24 rounded border px-2 py-1 bg-transparent"
          />
        </label>

        <label className="text-sm">
          Touch tolerance (% of range)
          <input
            type="number"
            step="0.1"
            min={0.05}
            max={2}
            value={touchPct}
            onChange={e => setTouchPct(Math.max(0.05, Math.min(2, Number(e.target.value) || 0.3)))}
            className="ml-2 w-28 rounded border px-2 py-1 bg-transparent"
          />
        </label>

        <label className="text-sm inline-flex items-center gap-2">
          <input type="checkbox" checked={useAuto} onChange={e => setUseAuto(e.target.checked)} />
          Use auto-suggested levels
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-2 mb-4">
        <input
          type="number"
          placeholder="Add level (e.g. 112.5)"
          value={customLevel}
          onChange={e => setCustomLevel(e.target.value)}
          className="w-44 rounded border px-3 py-1 bg-transparent"
        />
        <button onClick={addLevel} className="px-3 py-1 rounded border">
          Add Level
        </button>
      </div>

      {/* Chart */}
      <svg className="w-full" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Support & Resistance chart">
        <rect x="0" y="0" width={W} height={H} fill="none" />
        {/* price path */}
        <path d={path(prices, W, H)} fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />

        {/* S/R levels */}
        {activeLevels.map((L, i) => {
          const ns = normalize(prices);
          // map price → y
          const min = Math.min(...prices), max = Math.max(...prices);
          const y = 8 + (1 - (L - min) / ((max - min) || 1)) * (H - 16);
          return (
            <g key={`lvl-${i}`}>
              <line x1="8" x2={W - 8} y1={y} y2={y} stroke="currentColor" opacity="0.25" strokeDasharray="4 4" />
              <text x={W - 8} y={y - 4} textAnchor="end" fontSize="10" className="fill-current">
                {L.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* swing markers (tiny) */}
        {[...(swings.highs || []), ...(swings.lows || [])].map(sw => {
          const ns = normalize(prices);
          const x = 8 + (sw.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[sw.idx]) * (H - 16);
          return <circle key={`sw-${sw.idx}`} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.45" />;
        })}

        {/* events */}
        {events.map((ev, k) => {
          const ns = normalize(prices);
          const x = 8 + (ev.idx / (prices.length - 1)) * (W - 16);
          const y = 8 + (1 - ns[ev.idx]) * (H - 16);
          return (
            <g key={`ev-${k}`}>
              <rect x={x - 5} y={y - 5} width="10" height="10" fill="currentColor" />
              <text x={x + 8} y={y - 8} fontSize="10" className="fill-current">{ev.type}</text>
            </g>
          );
        })}
      </svg>

      {/* Level pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {activeLevels.map(L => (
          <span key={`pill-${L}`} className="text-xs rounded-full border px-2 py-1">
            {L.toFixed(2)}
            {!useAuto && (
              <button
                className="ml-2 text-xs opacity-60 hover:opacity-100"
                onClick={() => removeLevel(L)}
                aria-label={`Remove ${L}`}
              >
                ✕
              </button>
            )}
          </span>
        ))}
        {activeLevels.length === 0 && (
          <span className="text-sm text-gray-500">No levels yet — add one or enable auto-suggest.</span>
        )}
      </div>

      {/* Events list */}
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Events</h4>
        {events.length === 0 ? (
          <div className="text-sm text-gray-500">No touches or breaks with current settings.</div>
        ) : (
          <ul className="text-sm space-y-1">
            {events.map((e, i) => (
              <li key={`li-${i}`}>
                {e.type} at index {e.idx} near level {e.level.toFixed(2)} (price {e.price.toFixed ? e.price.toFixed(2) : e.price})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
