
# Bots Components (Financial Empire)

Drop `components/bots` into your project's `src/components/bots` (or adjust imports). These are
paper-trading bots with localStorage persistence and CSV/JSON export.

## What's inside
- `SafeBot.jsx` — conservative rules, wider stops, smaller sizing
- `AggressiveBot.jsx` — momentum/mean-reversion switches, tighter stops
- `ManualBot.jsx` — manual trade ticket with order preview
- Shared UI
  - `BotControls.jsx` — start/pause/reset, market mode
  - `LivePriceTicker.jsx` — mock live price feed (deterministic/randomized)
  - `TradeForm.jsx` — position sizing + risk preview
  - `PositionTable.jsx` — open/closed positions with P/L
  - `PnLWidget.jsx` — realized/unrealized with equity curve preview
  - `RiskSettings.jsx` — account size, risk %, trailing stop toggle
  - `StrategyConfig.jsx` — strategy knobs (MAs, RSI, breakout lengths)
  - `BacktestPanel.jsx` — quick backtest on mock candles (seeded RNG)
- Helpers
  - `storage.js` — localStorage, CSV/JSON exporters
  - `math.js` — P/L calc, trailing stop updates
  - `feed.js` — seeded mock ticker + OHLC generator
  - `defaults.js` — default coins, columns, keys
- `index.js` — barrel exports

## Notes
- This is **client-side only**. Replace feed/backtest with real APIs when ready.
- State is stored under keys `fe:bots:*` in localStorage.
- Default coins order: SOL, ETH, BTC, PEPE, XRP, LTC.
