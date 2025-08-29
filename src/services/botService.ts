/* src/services/botService.ts */
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export type BotStatus = {
  botName: string;
  status: "idle" | "running" | "paused" | "error";
  updatedAt?: string;
  lastRunAt?: string;
  message?: string;
  running?: boolean;
  lastPrice?: number;
  [key: string]: any;
};

/**
 * Reads Firestore at: botStatus/{botName}
 * Falls back to { status: "idle" } if the doc doesn't exist.
 */
export async function getBotStatus(botName: string): Promise<BotStatus> {
  const ref = doc(db, "botStatus", botName);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data() as any;

    // ✅ Only the second candidate may be undefined; final ?? "idle" is safe.
    const status: BotStatus["status"] =
      (data.status as BotStatus["status"] | undefined) ??
      (typeof data.running === "boolean"
        ? (data.running ? "running" : "idle")
        : undefined) ??
      "idle";

    const merged: BotStatus = {
      botName,
      status,
      updatedAt: data.updatedAt ?? data.timestamp,
      lastRunAt: data.lastRunAt,
      message: data.message,
      lastPrice: typeof data.lastPrice === "number" ? data.lastPrice : undefined,
      running:
        typeof data.running === "boolean" ? data.running : status === "running",
      ...data,
    };

    return merged;
  }

  // Default if no doc exists yet
  return { botName, status: "idle" };
}
