/* src/services/sentimentService.ts
   Market Sentiment service:
   1) Try Firestore doc: market/sentiment  (expects { score: number, updatedAt?: string, ... })
   2) Fallback to API:   GET ${NEXT_PUBLIC_API_BASE_URL || '/api'}/sentiment
   3) Cache in sessionStorage on the client for a short TTL to avoid spamming sources.
*/
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export type SentimentLabel =
  | "extreme_fear"
  | "fear"
  | "neutral"
  | "greed"
  | "extreme_greed";

export type MarketSentiment = {
  score: number;           // Prefer 0–100, but -100..100 or 0..1 also accepted
  label: SentimentLabel;
  updatedAt?: string;
  sources?: string[];
  [key: string]: any;
};

type Options = { signal?: AbortSignal };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
const CACHE_KEY = "market:sentiment";
const CACHE_TTL_MS = 60_000; // 1 minute

export async function fetchMarketSentiment(opts?: Options): Promise<MarketSentiment> {
  // 0) Client cache
  const cached = readFromSession();
  if (cached && Date.now() - (cached as any)._cachedAt < CACHE_TTL_MS) {
    return stripCacheMeta(cached);
  }

  // 1) Firestore: market/sentiment
  try {
    const snap = await getDoc(doc(db, "market", "sentiment"));
    if (snap.exists()) {
      const data = snap.data() as any;
      const score = normalizeScore(data.score ?? data.value ?? 50);
      const payload: MarketSentiment = {
        score,
        label: toLabel(score),
        updatedAt: data.updatedAt ?? data.timestamp,
        sources: data.sources,
        ...data,
      };
      cacheToSession(payload);
      return payload;
    }
  } catch {
    // ignore and fall back to API
  }

  // 2) Fallback API
  try {
    const res = await fetch(`${API_BASE}/sentiment`, { signal: opts?.signal });
    if (res.ok) {
      const raw = (await res.json()) as any;
      const score = normalizeScore(raw.score ?? raw.value ?? 50);
      const payload: MarketSentiment = {
        score,
        label: toLabel(score),
        updatedAt: raw.updatedAt ?? raw.timestamp,
        sources: raw.sources,
        ...raw,
      };
      cacheToSession(payload);
      return payload;
    }
    throw new Error(`fetchMarketSentiment: ${res.status} ${res.statusText}`);
  } catch (e) {
    console.error("fetchMarketSentiment fallback failed", e);
    const fallback: MarketSentiment = { score: 50, label: "neutral" };
    cacheToSession(fallback);
    return fallback;
  }
}

/** Accepts 0–100, -100..100, or 0..1 and returns 0–100. */
function normalizeScore(v: number): number {
  if (v == null || Number.isNaN(v)) return 50;
  if (v <= 1 && v >= 0) return Math.round(v * 100);
  if (v <= 100 && v >= 0) return Math.round(v);
  if (v <= 100 && v >= -100) return Math.round((v + 100) / 2);
  return Math.max(0, Math.min(100, Math.round(v)));
}

function toLabel(score: number): SentimentLabel {
  // Common thresholds for FGI-style scales
  if (score <= 25) return "extreme_fear";
  if (score <= 45) return "fear";
  if (score < 55) return "neutral";
  if (score < 75) return "greed";
  return "extreme_greed";
}

function cacheToSession(data: MarketSentiment) {
  if (typeof window === "undefined" || !globalThis.sessionStorage) return;
  try {
    const withMeta = { ...data, _cachedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(withMeta));
  } catch {}
}
function readFromSession(): (MarketSentiment & { _cachedAt: number }) | null {
  if (typeof window === "undefined" || !globalThis.sessionStorage) return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as any) : null;
  } catch {
    return null;
  }
}
function stripCacheMeta(d: any): MarketSentiment {
  const { _cachedAt, ...rest } = d ?? {};
  return rest as MarketSentiment;
}
