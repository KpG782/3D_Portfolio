const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 10; // messages per IP per hour (brief §Phase 3.5)

// In-memory sliding window — per-instance, resets on cold start. Honest
// fallback until Upstash credentials exist; good enough to stop drive-by abuse.
const memory = new Map<string, number[]>();

function memoryLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (memory.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) {
    memory.set(ip, hits);
    return false;
  }
  hits.push(now);
  memory.set(ip, hits);
  if (memory.size > 5000) memory.clear(); // crude bound
  return true;
}

/** Sliding-window limit via Upstash Redis REST (no SDK dependency). */
async function upstashLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const key = `chat:${ip}`;
  const now = Date.now();
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["ZREMRANGEBYSCORE", key, 0, now - WINDOW_MS],
      ["ZCARD", key],
      ["ZADD", key, now, `${now}-${Math.random()}`],
      ["EXPIRE", key, 3600],
    ]),
    cache: "no-store",
  });
  if (!res.ok) return memoryLimit(ip); // fail open to the local limiter
  const results = (await res.json()) as { result: number }[];
  const count = results[1]?.result ?? 0;
  return count < LIMIT;
}

export async function allow(ip: string): Promise<boolean> {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    try {
      return await upstashLimit(ip);
    } catch {
      return memoryLimit(ip);
    }
  }
  return memoryLimit(ip);
}
