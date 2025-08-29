import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export type BotStatus = {
  botName: string;
  status: "idle" | "running" | "paused" | "error";
  running: boolean;
  lastDecision?: string;
  lastPrice?: number;
  updatedAt?: string;
  lastRunAt?: string;
  message?: string;
  [key: string]: any;
};

type GetBotStatusOptions = { signal?: AbortSignal };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export async function getBotStatus(
  botName: string,
  opts?: GetBotStatusOptions
): Promise<BotStatus> {

  try {
    const snap = await getDoc(doc(db, "botStatus", botName));
    if (snap.exists()) {
      const data = snap.data() as any;
      const status: BotStatus["status"] =
        (data.status as BotStatus["status"]) ??
        (data.running ? "running" : "idle") ??
        "idle";
      const merged: BotStatus = {
        botName,
        status,
        running: status === "running",
        lastDecision: data.lastDecision,
        lastPrice: typeof data.lastPrice === "number" ? data.lastPrice : undefined,
        updatedAt: data.updatedAt,
        lastRunAt: data.lastRunAt,
        message: data.message,
        ...data,
      };
      cacheToSession(botName, merged);
      return merged;
    }
  } catch (e) {
  }

  try {
    const res = await fetch(
      `${API_BASE}/bot-status/${encodeURIComponent(botName)}`,
      { signal: opts?.signal }
    );
    if (res.ok) {
      const data = (await res.json()) as Partial<BotStatus>;
      const status: BotStatus["status"] =
        (data.status as BotStatus["status"]) ??
        (data.running ? "running" : "idle") ??
        "idle";
      const merged: BotStatus = {
        botName,
        status,
        running: status === "running",
        lastDecision: data.lastDecision,
        lastPrice: typeof data.lastPrice === "number" ? data.lastPrice : undefined,
        updatedAt: data.updatedAt,
        lastRunAt: data.lastRunAt,
        message: (data as any)?.message,
        ...(data as any),
      };
      cacheToSession(botName, merged);
      return merged;
    }
    throw new Error(`getBotStatus: ${res.status} ${res.statusText}`);
  } catch (e) {
    console.error("getBotStatus failed", e);
    const cached = readFromSession(botName);
    if (cached) return cached;
    return { botName, status: "idle", running: false };
  }
}

function cacheToSession(botName: string, data: BotStatus) {
  if (typeof window === "undefined" || !globalThis.sessionStorage) return;
  try {
    sessionStorage.setItem(`botStatus:${botName}`, JSON.stringify(data));
  } catch {}
}
function readFromSession(botName: string): BotStatus | null {
  if (typeof window === "undefined" || !globalThis.sessionStorage) return null;
  try {
    const raw = sessionStorage.getItem(`botStatus:${botName}`);
    return raw ? (JSON.parse(raw) as BotStatus) : null;
  } catch {
    return null;
  }
}
