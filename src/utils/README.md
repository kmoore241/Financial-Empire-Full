# utils

Shared utilities for Financial Empire.

## Files
- **api.ts** — small fetch wrapper with base URL, timeout, JSON helpers, `ApiError`, and compatibility helpers (`fetchOHLC`, `fetchIndicator`)
- **format.ts** — number, currency, percent, and date/time formatting (Intl-based)
- **storage.ts** — SSR-safe local/session storage with JSON helpers
- **index.ts** — barrel export

## Environment
- `VITE_API_BASE_URL` (Vite) **or** `REACT_APP_API_BASE_URL` (CRA).  
  Falls back to `/api` if not set.

## Quick usage

```ts
import { getJSON, postJSON, requestJSON, ApiError, withTimeout } from '@/utils';
import { formatCurrency, formatPercent } from '@/utils';
import { localStore, sessionStore } from '@/utils';

// POST JSON
await postJSON('/orders', { qty: 2 });

// Formatting
formatCurrency(1234.5, 'USD'); // $1,234.50
formatPercent(0.0875);         // 8.75%

// Storage
localStore.setJSON('prefs', { theme: 'dark' });
const prefs = localStore.getJSON('prefs');
```

### Error handling with ApiError
```ts
try {
  await requestJSON('/maybe-fails');
} catch (e) {
  if (e instanceof ApiError) {
    console.error(e.status, e.statusText, e.data);
  } else {
    console.error(e);
  }
}
```

### Timeout / cancellation
```ts
const ctrl = new AbortController();
// Abort after 8s (and respects ctrl.signal if you abort manually)
const { signal } = withTimeout(ctrl.signal, 8000);
await getJSON('/slow-endpoint', { signal });
```

### Compatibility helpers
```ts
import { fetchOHLC, fetchIndicator } from '@/utils';

// Single-symbol OHLC (POST /chart under the hood)
const ohlc = await fetchOHLC('BTC', '1d');

// Example indicator fetch (GET /indicator?symbol=...&indicator=...)
const rsi = await fetchIndicator('BTC', 'rsi', '1d');
```
