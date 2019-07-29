import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import WebFont from "webfontloader";
//import { stringify } from "flatted";

import { Media } from "./../../hooks";

import Theme, { switchThemeFrom } from "../Theme";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";
import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "../Categories";
import Meta from "../Meta";
import Logo from "../Logo";
import Main from "../Main";
import _Icon from "../Icon";
import { Section as _Section } from "../SemanticHTML";

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
  settings: PropTypes.shape(SettingsPropTypes),
  /**
   * The default theme switcher icon
   */
  defaultThemeSwitcherIcon: PropTypes.string,
  /**
   * The default category query
   */
  defaultCategoriesQuery: CategoriesPropTypes.variables
};

/**
 * Defines the default props
 */
const defaultProps = {
  settings: SettingsDefaultProps,
  defaultThemeSwitcherIcon: "Theme switcher",
  defaultCategoriesQuery: CategoriesDefaultProps.variables
};

/**
 * Styles the component for mobiles
 */
const SectionMobile = {
  minHeight: "100vh",

  gridTemplateColumns: "calc(var(--lem) * 3) auto",
  gridTemplateAreas: `
    "logo logo"
    "menudd menudd"
    "content content"
    "themeswi contentswi"`
};

/**
 * Styles the component for tablets
 */
const SectionTablet = props => ({
  minHeight: "100vh",

  gridTemplateColumns: props.theme.sizing.home.gridTemplateColumns.tablet,
  gridTemplateAreas: `
    "logo menudd contentswi themeswi ."
    "content content content content content"`
});

/**
 * Styles the component for laptops
 */
const SectionLaptop = props => ({
  gridTemplateColumns: props.theme.sizing.home.gridTemplateColumns.laptop,

  "& .Slider, .Thumbs, .Contact": {
    marginTop: "calc(var(--lem) * 2)"
  }
});

/**
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  ...props.theme.colorPairs.default,
  ...props.theme.fonts.default,

  display: "grid",
  alignItems: "start",

  [`${Media.mobile}`]: {
    ...props.theme.padding.mobile,
    ...SectionMobile
  },

  [`${Media.tablet}`]: {
    ...props.theme.padding.tablet,
    ...SectionTablet(props)
  },

  [`${Media.laptop}`]: {
    ...props.theme.padding.laptop,
    ...SectionLaptop(props)
  },

  [`${Media.desktop}`]: {
    ...props.theme.padding.desktop
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
 * The animated home container.
 *
 * `keyframes` needs to be used with `css`
 */
const HomeAnimated = styled(Section)(
  props => css`
    animation: ${props.theme.animations.fadeInPage};
    animation-duration: 1.5s;
  `
);

/**
 * Styles the theme switcher icon
 */
const Icon = styled(_Icon)(props => ({
  [`${Media.mobile}`]: {
    marginTop: "calc(var(--lem) / 1)"
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
  const { settings, defaultThemeSwitcherIcon, defaultCategoriesQuery } = props;

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
  const siteSettings = Settings(settings);

  /**
   * Loads categories from the database
   */
  const categories = Categories({ variables: defaultCategoriesQuery });

  return (
    <>
      <Reset />
      <Meta {...siteSettings} />
      <ThemeContext.Provider value={activeTheme}>
        <TypographicGrid
          displayVerticalRhytm={false}
          displayHorizontalRhytm={false}
        />
        <HomeAnimated className="Home" title="Home" theme={theme}>
          <Icon
            className="ThemeSwitcherIcon"
            sizeMultiplier={1}
            clickHandler={switchTheme}
          >
            {sunIcon}
          </Icon>
          <Logo {...siteSettings} />
          <Main categories={categories} />
        </HomeAnimated>
      </ThemeContext.Provider>
    </>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps, ThemeContext };
