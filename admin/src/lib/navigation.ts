
/**
 * Check if a path is active based on the current location
 * Handles nested routes while avoiding conflicts with sibling routes
 */
export const isPathActive = (
  itemPath: string,
  currentPath: string,
): boolean => {
  // Exact match
  if (itemPath === currentPath) return true;

  // For non-root paths, check nested routes
  if (itemPath !== "/" && currentPath.startsWith(itemPath)) {
    const nextChar = currentPath[itemPath.length];
    // Must be end of string or followed by "/"
    if (nextChar === undefined || nextChar === "/") {
      return true;
    }
  }

  return false;
};

/**
 * Find the best matching path from a list of paths
 * Returns the most specific match (longest path that matches)
 */
export const findBestMatchingPath = (
  paths: string[],
  currentPath: string,
): string | null => {
  const matches = paths.filter((path) => isPathActive(path, currentPath));

  if (matches.length === 0) return null;

  // Return the longest (most specific) match
  return matches.reduce((best, current) =>
    current.length > best.length ? current : best,
  );
};
