import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 1, // 1 point
  duration: 60, // Per 60 seconds
});

export async function checkRateLimit(identifier: string) {
  try {
    await rateLimiter.consume(identifier);
    return { success: true };
  } catch (rejRes) {
    return { error: "Too many requests. Please try again later." };
  }
}
