import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WebFont from "webfontloader";
//import { stringify } from "flatted";

import { Media } from "./../../hooks";

import Theme, { switchThemeFrom } from "../Theme";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import { Section as _Section } from "../SemanticHTML";
import Meta from "../Meta";
import Logo from "../Logo";
import Main from "../Main";
import _Icon from "../Icon";

/**
 * Loads web fonts
 *
 * NOTE: When changing font also the `theme` has to be updated
 */
WebFont.load({
  google: {
    families: ["Major+Mono+Display"]
  }
});

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The site settings
   */
  ...SettingsPropTypes,
  /**
   * The theme switcher icon
   */
  defaultThemeSwitcherIcon: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...SettingsDefaultProps,
  defaultThemeSwitcherIcon: "Theme switcher"
};

/**
 * Styles the component for mobiles
 */
const SectionMobile = {
  padding: "var(--lem)",
  minHeight: "100vh",

  gridTemplateColumns: "calc(var(--lem) * 3) auto",
  gridTemplateRows: "calc(var(--lem) * 2) 1fr auto calc(var(--lem) * 2)",
  gridTemplateAreas: `
    "logo logo"
    "menudd menudd"
    "content content"
    "themeswi contentswi"`
};

/**
 * Styles the component for tablets
 */
const SectionTablet = {
  padding: "calc(var(--lem) * 2) calc(var(--lem) * 2)",
  height: "100vh",

  gridTemplateColumns:
    "calc(var(--lem) * 10) calc(var(--lem) * 15) calc(var(--lem) * 3) calc(var(--lem) * 3) auto",
  gridTemplateRows: "1fr auto",
  gridTemplateAreas: `
    "logo menudd contentswi themeswi ."
    "content content content content content"`,

  "& .Slider, .Thumbs, .Contact": {
    marginTop: "calc(var(--lem) * 2)"
  }
};

/**
 * Styles the component for laptops
 */
const SectionLaptop = {
  padding: "calc(var(--lem) * 2) calc(var(--lem) * 4)"
};

/**
 * Styles the component for desktops
 */
const SectionDesktop = {
  padding: "calc(var(--lem) * 2) calc(var(--lem) * 10)"
};

/**
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  ...props.theme.colorPairs.default,
  ...props.theme.fonts.default,

  display: "grid",
  alignItems: "start",

  [`${Media.mobile}`]: {
    ...SectionMobile
  },

  [`${Media.tablet}`]: {
    ...SectionTablet
  },

  [`${Media.laptop}`]: {
    ...SectionLaptop
  },

  [`${Media.desktop}`]: {
    ...SectionDesktop
  },

  "& .Logo": {
    gridArea: "logo"
  },

  "& .MenuDropdown": {
    gridArea: "menudd"
  },

  "& .ThemeSwitcherIcon": {
    gridArea: "themeswi"
  },

  "& .ContentSwitcherIcon": {
    gridArea: "contentswi"
  },

  "& .Slider, .Thumbs, .Contact": {
    gridArea: "content"
  }
}));

/**
 * Styles the theme switcher icon
 */
const Icon = styled(_Icon)(props => ({
  [`${Media.mobile}`]: {
    marginTop: "calc(var(--lem) / 2)"
  },

  [`${Media.tablet}`]: {
    marginTop: "calc(var(--lem) * 2)"
  }
}));

/**
 * Creates a theme context
 */
const ThemeContext = React.createContext({});

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Loads props
   */
  const { defaultThemeSwitcherIcon } = props;

  /**
   * Sets up theme
   */
  const { starterTheme, setCurrentThemeSaved } = Theme();

  /**
   * Saves theme into a state so it can be switched during a session.
   */
  const [activeTheme, setActiveTheme] = useState(starterTheme);

  /**
   * Switches the theme.
   * Saves the new theme into the local storage
   */
  const switchTheme = () => {
    const newTheme = switchThemeFrom(activeTheme.colorScheme);
    setActiveTheme(newTheme);
    setCurrentThemeSaved(newTheme.colorScheme);
  };

  /**
   * Displays a theme switcher icon
   */
  const { theme } = activeTheme;
  const { icons } = theme;
  const sunIcon = icons.sun ? icons.sun : defaultThemeSwitcherIcon;

  /**
   * Loads site settings from the database
   */
  const siteSettings = Settings(props);

  return (
    <>
      <Reset />
      <Meta {...siteSettings} />
      <ThemeContext.Provider value={activeTheme}>
        <TypographicGrid
          displayVerticalRhytm={false}
          displayHorizontalRhytm={false}
        />
        <Section className="Home" title="Home" theme={theme}>
          <Icon
            className="ThemeSwitcherIcon"
            size={1}
            onClick={() => switchTheme()}
          >
            {sunIcon}
          </Icon>
          <Logo {...siteSettings} />
          <Main />
        </Section>
      </ThemeContext.Provider>
    </>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps, ThemeContext };
