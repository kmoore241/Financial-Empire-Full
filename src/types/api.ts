// types/api.ts

/** OHLCV bar for charting (epoch ms). */
export interface ChartCandle {
  time: number;   // epoch ms
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Alias to match earlier service naming (non-breaking). */
export type ChartData = ChartCandle;

/** Wallet balances keyed by symbol. */
export type WalletBalance = Record<string, number> & {
  SOL?: number;
  ETH?: number;
  BTC?: number;
  USD?: number;
};

export type TradeSide = 'buy' | 'sell';

/** Trade history record. */
export interface TradeRecord {
  id: string;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  timestamp: string; // ISO string
}

/** Market sentiment snapshot. */
export interface MarketSentiment {
  fearGreedIndex: number;
  timestamp: string; // ISO string
}

export type BotDecision = 'buy' | 'sell' | 'hold';

/** Trading bot status. */
export interface BotStatus {
  botName: string;
  running: boolean;
  lastDecision: BotDecision;
  lastPrice: number;
}

/** LMS progress snapshot. */
export interface UserProgress {
  completedLessons: string[];
  /** quiz key -> score percentage (0-100) */
  quizScores: Record<string, number>;
}

/** Admin check result for the current user. */
export interface AdminStatus {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}
