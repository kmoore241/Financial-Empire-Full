# types

Shared TypeScript types for **Financial Empire**.

## Files & Exports
- **quiz.ts** — `QuizQuestion`, `QuizAnswer`
- **api.ts** — `ChartCandle` (alias: `ChartData`), `WalletBalance`, `TradeRecord`, `MarketSentiment`, `BotStatus`, `UserProgress`, `AdminStatus`, `TradeSide`, `BotDecision`
- **index.ts** — barrel export

## Usage
Prefer type-only imports to keep bundles lean:
```ts
import type { QuizQuestion, UserProgress } from '@/types';
// or
import type { QuizQuestion } from '@/types/quiz';
```

## Conventions
- **Timestamps** are ISO strings unless noted.
- **Numbers** (balances, prices, volumes) use `number` (no BigInt).
- **Enums** are string unions (e.g., `TradeSide = 'buy' | 'sell'`).

## Aliases
`ChartData` is an alias of `ChartCandle` for compatibility with older code:
```ts
import type { ChartData } from '@/types'; // = ChartCandle
```

## Tips
- Keep additions **backwards compatible** (add new fields as optional).
- If you rename a type, add a temporary alias in `index.ts` and remove it later.
- Ensure your path alias is set (in `tsconfig.json` / `jsconfig.json`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```
