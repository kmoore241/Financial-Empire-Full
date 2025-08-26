
# Training Drills (Financial Empire)

Interactive LMS-style practice drills for chart skills. Zero-dependency (React + Tailwind only),
SVG-based charts, and localStorage scoring.

## What's inside
- `DrillLayout.jsx` — common shell with title/description/score
- `DrillChart.jsx` — lightweight SVG chart (close line + overlays)
- `ScoreBadge.jsx` — pass/fail indicator
- `utils/ohlc.js` — seeded OHLC generator
- `utils/indicators.js` — SMA, EMA, RSI, MACD
- Drills:
  - `SupportResistanceDrill.jsx`
  - `SmartMoneyDrill.jsx` (order-block approximation)
  - `MACrossoverDrill.jsx`
  - `RSIMACDDrill.jsx`
  - `VolumeBreakoutDrill.jsx`
- `index.js` — barrel exports

## Notes
- State is saved under `fe:drills:*` in localStorage.
- Scoring is approximate and meant for practice, not strict grading.
- You can swap the generator with real candles later.
