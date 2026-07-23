const DEFAULT_LIMIT = 10
const MAX_LIMIT = 10

export default function normalizeLimit(limit: unknown): number {
    const parsed = Number(limit)
    if (Number.isNaN(parsed) || parsed < 1) {
        return DEFAULT_LIMIT
    }
    return Math.min(parsed, MAX_LIMIT)
}