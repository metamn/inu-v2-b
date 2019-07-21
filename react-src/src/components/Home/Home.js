import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WebFont from "webfontloader";
//import { stringify } from "flatted";

import { useTheme } from "./../../hooks";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import { Section as _Section } from "../SemanticHTML";
import Meta from "../Meta";
import Logo from "../Logo";
import Main from "../Main";
import Icon from "../Icon";

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
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  ...props.theme.colorPairs.default,
  ...props.theme.fonts.default,
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
}));

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Loads props
   */
  const { defaultThemeSwitcherIcon } = props;

  /**
   * Sets up theming
   */
  const { activeTheme, switchTheme, ThemeContext } = useTheme();

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
        <TypographicGrid />
        <Section className="Home" title="Home" theme={activeTheme.theme}>
          <Icon onClick={() => switchTheme()}>{sunIcon}</Icon>
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
export { propTypes, defaultProps };
