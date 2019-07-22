import React from "react";
import { modularScale } from "polished";
import { FiSun, FiGrid, FiChevronUp, FiChevronDown } from "react-icons/fi";

import { useLocalStorage, usePrefersDarkMode } from "../../hooks";

/**
 * Icons
 */
const icons = {
  sun: <FiSun />,
  grid: <FiGrid />,
  chevronUp: <FiChevronUp />,
  chevronDown: <FiChevronDown />
};

/**
 * Cursors
 */
const cursors = {
  light: {
    brutalistCursor2: "brutalist_line_SVGicon_cursor2.png"
  },
  dark: {
    brutalistCursor2: "brutalist_line_SVGicon_cursor2-black.png"
  }
};

/**
 * Color definitions
 */
const colors = {
  white: "white",
  black: "black",
  gray: "#666",
  lightgray: "lightgray",
  darkgray: "#333"
};

/**
 * Color schemes
 */
const colorSchemes = {
  light: {
    text: colors.black,
    background: colors.white,
    inactive: colors.gray,
    gray: colors.gray,
    placeholder: colors.white,
    borderColor: colors.black
  },
  dark: {
    text: colors.white,
    background: colors.black,
    inactive: colors.darkgray,
    gray: colors.lightgray,
    placeholder: colors.black,
    borderColor: colors.white
  }
};

/**
 * Color pairs.
 *
 * Colors come in pairs. And with an accessible contrast ratio.
 * We don't set a single color, we always set a pair of colors, one for the background, the other for the text, and make sure when they are paired their color contrast ratio is checked first
 *
 * @param  Object colors A set of colors of a color scheme
 * @return Object        A set of color pairs
 */
const getColorPairs = colors => {
  const { text, background, inactive } = colors;

  return {
    default: {
      color: text,
      backgroundColor: background
    },
    inverted: {
      color: background,
      backgroundColor: text
    },
    inactive: {
      color: inactive,
      backgroundColor: background
    }
  };
};

/**
 * Fonts
 *
 * NOTE:  When changing font also the `WebFont.load` has to be updated
 */
const fonts = {
  default: {
    fontFamily: "'Major Mono Display', sans-serif;"
  }
};

/**
 * Link styles
 */
const links = {
  default: {
    textDecoration: "none",

    "&:hover": {
      textDecoration: "line-through"
    }
  }
};

/**
 * Text styles
 */
const scales = {
  large: 1
};

/**
 * Text styles
 */
const textStyles = {
  // Grid is set up elsewhere manually since createGlobalStyle supports only tagged liters
  default: {
    fontSize: "100%"
  },
  large: {
    fontSize: modularScale(scales.large)
  }
};

/**
 * Returns a color scheme
 *
 * @param  String colorScheme The name of the color scheme
 * @return Object             The color scheme
 */
const getColorScheme = colorScheme =>
  colorScheme === "light" ? colorSchemes.light : colorSchemes.dark;

/**
 * Returns a complete theme with colors, fonts etc
 *
 * @param  String colorScheme The name of the color scheme
 * @return Object             The theme
 */
const getTheme = colorScheme => {
  const colors = getColorScheme(colorScheme);

  return {
    colors: colors,
    colorPairs: getColorPairs(colors),
    fonts: fonts,
    textStyles: textStyles,
    links: links,
    icons: icons,
    cursors: cursors[colorScheme],
    /** Temporary, we'll have to get from the database */
    themeUri: "wp-content/themes/inu-v2-a"
  };
};

/**
 * Switches from a color scheme to another
 * Useful when clicking the theme switcher button
 *
 * @param  String colorScheme The name of the color scheme from switch
 * @return Object             The theme and the color scheme name
 */
const switchThemeFrom = colorScheme => {
  return colorScheme === "light"
    ? { colorScheme: "dark", theme: getTheme("dark") }
    : { colorScheme: "light", theme: getTheme("light") };
};

/**
 * Switches to a color scheme
 *
 * @param  String colorScheme The name of the color scheme to switch
 * @return Object             The theme and the color scheme name
 */
const switchThemeTo = colorScheme => {
  return { colorScheme: colorScheme, theme: getTheme(colorScheme) };
};

/**
 * Returns a starter theme and a local storage setter.
 */
const Theme = () => {
  /**
   * Checks if the user / browser prefers dark mode.
   */
  const prefersDarkMode = usePrefersDarkMode();

  /**
   * Checks if the browser has stored a preference for a theme.
   */
  const [currentThemeSaved, setCurrentThemeSaved] = useLocalStorage(
    "current-theme"
  );

  /**
   * Defines the color scheme based on the above preferences.
   */
  const starterColorScheme =
    typeof currentThemeSaved !== "undefined"
      ? currentThemeSaved
      : prefersDarkMode
      ? "dark"
      : "light";

  /**
   * Returns the starter theme
   */
  const starterTheme = switchThemeTo(starterColorScheme);

  return {
    starterTheme: starterTheme,
    setCurrentThemeSaved: setCurrentThemeSaved
  };
};

/**
 * Exports default data
 */
export default Theme;

/**
 * Exports additional data
 */
export { switchThemeFrom };

/**
 * Exports original values for the styleguide
 */
export { colors as sgColors, scales as sgScales };
