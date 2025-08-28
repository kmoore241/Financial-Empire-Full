# services

This folder contains client-side API wrappers for Financial Empire.

## Service Files

- **chartService.ts**: `getChartData(symbols: string[]): Promise<any[]>`
- **tradeService.ts**: `getUserTradeHistory(userId: string): Promise<any[]>`
- **botService.ts**: `getBotStatus(botName: string): Promise<any>`
- **walletService.ts**: `getWalletBalance(): Promise<any>`
- **sentimentService.ts**: `fetchMarketSentiment(): Promise<any>`
- **userService.ts**: `getUserProgress(userId: string): Promise<any>`

---

## Environment

- `REACT_APP_API_BASE_URL` – URL prefix for all API calls (defaults to `/api`)

---

## Usage

Each service function **throws** an error on non-OK HTTP responses. Be sure to wrap calls in `try/catch`:

```ts
try {
  const data = await getChartData(['BTC', 'ETH']);
} catch (err) {
  // handle network or API errors
}
