/**
 * Query browser for a specific Media item
 * Adapted from https://usehooks.com/useMedia/
 * Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 *
 * Example:
 * ```
 * useMatchMedia(["(prefers-color-scheme: dark)"], [true], false)
 * ```
 *
 * @param  Array   queries      The media query strings
 * @param  Array   values       The media query values
 * @param  Any     defaultValue The default value
 * @return Any                  The browser response
 */
const useMatchMedia = (queries, values, defaultValue) => {
  /**
   * Queries the browser
   */
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  /**
   * Checks if there is a match in the results
   */
  const index = mediaQueryLists.findIndex(mql => mql.matches);

  /**
   * Returns the match or defaultValue if none
   */
  return typeof values[index] !== "undefined" ? values[index] : defaultValue;
};

export default useMatchMedia;
