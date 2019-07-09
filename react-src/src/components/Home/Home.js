import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { stringify } from "flatted";

import { useTheme } from "./../../hooks";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Logo from "../Logo";
import Main from "../Main";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
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
   * Loads site settings from the database
   */
  const siteSettings = Settings(props);

  /**
   * Displays a theme switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const sunIcon = icons.sun;

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Container className="Home">
        Home
        <Icon>{sunIcon}</Icon>
        <Logo {...siteSettings} />
        <Main />
      </Container>
    </ThemeContext.Provider>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
