import { useState, useContext } from "react";
import { useLocalStorage, usePrefersDarkMode } from "./index";
import {
  ThemeContext,
  switchThemeTo,
  switchThemeFrom
} from "../themes/default.js";

/**
 * The theme hook
 *
 * - Sets the default theme from browser preferences and/or user preferences
 * - Saves theme into a state to make it switchable
 * - Returns the theme from state and makes available to children through `ThemeContext.Provider`
 * - Now children can use the theme via `useContext`
 * - When the theme is changed the `ThemeContext.Provider` is updated, so the theme instances in all children
 *
 * @return array The theme object, the theme switcher function and the theme context
 */
const useTheme = colorScheme => {
  /** Checks if the user / browser prefers dark mode */
  const prefersDarkMode = usePrefersDarkMode();

  /** Checks if the browser has stored a preference for a theme */
  const [currentThemeSaved, setCurrentThemeSaved] = useLocalStorage(
    "current-theme"
  );

  /** Defines the color scheme based on the above preferences */
  const starterColorScheme =
    typeof colorScheme !== "undefined"
      ? /** If we have a strong preference then we will use it */
        colorScheme
      : typeof currentThemeSaved !== "undefined"
      ? currentThemeSaved
      : prefersDarkMode
      ? "dark"
      : "light";

  /** Sets the theme based on the color scheme */
  let themeContext = useContext(ThemeContext);
  themeContext = switchThemeTo(starterColorScheme);

  /** Saves theme into a state so it can be switched during a session */
  const [currentTheme, setCurrentTheme] = useState(themeContext);

  /**
   * Switches theme
   * Saves the new theme into the local storage
   * @return {[type]} [description]
   */
  const switchTheme = () => {
    const newTheme = switchThemeFrom(currentTheme.colorScheme);
    setCurrentTheme(newTheme);
    setCurrentThemeSaved(newTheme.colorScheme);
  };

  return {
    /**
     * Used by the main component where theme is set and switched
     * @type Object
     */
    currentTheme: currentTheme,
    /**
     * The theme switch method
     * @type Function
     */
    switchTheme: switchTheme,
    /**
     * Used by child components where theme should be read through context
     * @type Object
     */
    theme: useContext(ThemeContext).theme,
    /**
     * This will offer the Provider wrapper
     * @type Object
     */
    ThemeContext: ThemeContext
  };
};

export default useTheme;
