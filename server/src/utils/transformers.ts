export function stringToJsonObject(
  value: string,
): Record<string, unknown> | string;

export function stringToJsonObject(value: unknown): unknown;

export function stringToJsonObject(value: unknown): unknown {
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      if (
        parsed !== null &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed)
      ) {
        return parsed as Record<string, unknown>;
      }
      return value; // keep original if not a plain object
    } catch {
      return value; // keep original if invalid JSON
    }
  }
  return value;
}
