import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 1000, // 1 секунда
    limit: 5, // 5 запросов в секунду
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === '/auth/csrf-token',
})