import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { stringify } from "flatted";

import { useTheme } from "./../../hooks";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Meta from "../Meta";
import Logo from "../Logo";
import Main from "../Main";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The site settings
   */
  ...SettingsPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...SettingsDefaultProps
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  ...props.theme.colorPairs.default,
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Sets up theming
   */
  const { currentTheme, switchTheme, ThemeContext } = useTheme();

  /**
   * Displays a theme switcher icon
   */
  const { theme } = currentTheme;
  const { icons } = theme;
  const sunIcon = icons.sun;

  /**
   * Loads site settings from the database
   */
  const siteSettings = Settings(props);

  return (
    <>
      <Meta {...siteSettings} />
      <ThemeContext.Provider value={currentTheme}>
        <Container className="Home" theme={currentTheme.theme}>
          Home
          <Icon onClick={() => switchTheme()}>{sunIcon}</Icon>
          <Logo {...siteSettings} />
          <Main />
        </Container>
      </ThemeContext.Provider>
    </>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
