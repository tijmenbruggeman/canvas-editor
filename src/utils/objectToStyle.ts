export function objectToStyle(obj: Record<string, string>): string {
    return Object.entries(obj)
        .map(([key, value]) => `${key}:${value}`)
        .join(';');
}