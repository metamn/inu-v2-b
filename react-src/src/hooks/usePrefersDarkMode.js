import useMatchMedia from "./useMatchMedia";

/**
 * Checks if the user / browser prefers dark mode
 * From https://usehooks.com/usePrefersDarkMode
 *
 * @return Boolean The user / browser preference
 */
function usePrefersDarkMode() {
  return useMatchMedia(["(prefers-color-scheme: dark)"], [true], false);
}

export default usePrefersDarkMode;
