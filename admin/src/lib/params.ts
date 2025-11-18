/**
 * Remove empty, undefined, and null values from an object
 * Useful for cleaning API query parameters
 */
export function cleanParams<T extends object>(
  params: T
): Record<string, unknown> {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);
}
