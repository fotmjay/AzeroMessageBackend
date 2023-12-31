export const rateLimiterConfig = {
  windowMs: 10 * 1000, // Window time:  X seconds
  limit: 5, // Limit each IP to Y requests per window.
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { xForwardedForHeader: false },
  // store: ... , // Use an external store for more precise rate limiting
};
