import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 1000, // 1 секунда
    limit: 3, // 3 запроса в секунду (еще строже)
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === '/auth/csrf-token',
})