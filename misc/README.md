
# Misc Components (Financial Empire)

This bundle fills in common gaps for the `components` folder with lightweight, dependency-free
(React + Tailwind) components.

## Structure
- `layout/` — public site header/footer/sidebar + theme provider
- `charts/` — SVG-based sparkline, area chart, candlestick, sentiment gauge
- `news/` — NewsFeed, HeadlinesGrid, MarketTicker
- `forms/` — LoginForm, SettingsForm
- `trade/` — TradeHistoryTable, OrderTicket, PositionCard
- `market/` — MarketSentiment, PriceBadge
- `notifications/` — Toaster (imperative), useToasts hook
- `index.js` — barrel exports

All components are standalone and avoid external libraries. Plug your data/API as needed.
