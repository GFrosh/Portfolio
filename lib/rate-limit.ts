/**
 * Sliding-window rate limiter.
 *
 * Why this is implemented inline instead of importing github.com/GFrosh/Rate-Limiter:
 * that package is Express *middleware* — it exports `(req, res, next)` and reads
 * from Express' `req.ip` / `req.user`. A Next.js Route Handler receives a Web
 * `Request` and returns a `Response`, with no `next()` chain to hook into, so the
 * middleware signature does not fit. The *algorithm* below is the same one that
 * package documents: keep the exact timestamps of recent requests per key, prune
 * anything older than the window on every call, and reject when the remaining
 * count reaches zero. Same idea, adapted to a handler-shaped API.
 */

export type RateLimitResult = {
  /** true when the request is allowed. */
  ok: boolean;
  /** Requests still allowed inside the current window. */
  remaining: number;
  /** Seconds until the oldest timestamp falls out of the window (0 when ok). */
  retryAfterSeconds: number;
  limit: number;
};

export type RateLimiter = {
  consume(key: string): RateLimitResult;
  /** Visible for tests. */
  size(): number;
};

export type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  /** Hard cap on tracked keys; oldest empty buckets are evicted first. */
  maxKeys?: number;
  /** Injectable clock — makes the limiter testable without fake timers. */
  now?: () => number;
};

export function createSlidingWindowLimiter(options: RateLimiterOptions): RateLimiter {
  const { windowMs, maxRequests, maxKeys = 10_000, now = Date.now } = options;
  const buckets = new Map<string, number[]>();

  function evictIfNeeded(currentTime: number) {
    if (buckets.size <= maxKeys) return;
    for (const [key, timestamps] of buckets) {
      const newest = timestamps[timestamps.length - 1] ?? 0;
      if (timestamps.length === 0 || newest <= currentTime - windowMs) {
        buckets.delete(key);
      }
      if (buckets.size <= maxKeys) break;
    }
  }

  return {
    consume(key: string): RateLimitResult {
      const currentTime = now();
      const cutoff = currentTime - windowMs;

      const previous = buckets.get(key) ?? [];
      // Prune anything that has fallen out of the window. Inclusive at the
      // edge: a request exactly windowMs old still counts, so the documented
      // 00:09 / 00:11 boundary burst is rejected.
      const timestamps = previous.filter((timestamp) => timestamp >= cutoff);

      if (timestamps.length >= maxRequests) {
        // Oldest surviving request decides when capacity returns.
        const oldest = timestamps[0] ?? currentTime;
        const retryAfterMs = Math.max(oldest + windowMs - currentTime, 0);
        buckets.set(key, timestamps);
        return {
          ok: false,
          remaining: 0,
          retryAfterSeconds: Math.max(Math.ceil(retryAfterMs / 1000), 1),
          limit: maxRequests,
        };
      }

      timestamps.push(currentTime);
      buckets.set(key, timestamps);
      evictIfNeeded(currentTime);

      return {
        ok: true,
        remaining: Math.max(maxRequests - timestamps.length, 0),
        retryAfterSeconds: 0,
        limit: maxRequests,
      };
    },

    size() {
      return buckets.size;
    },
  };
}

/**
 * Best-effort client identity for a Route Handler.
 * On Vercel `x-forwarded-for` is set by the platform; locally it is absent, so we
 * fall back to a constant bucket rather than crashing the handler.
 */
export function clientKeyFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
