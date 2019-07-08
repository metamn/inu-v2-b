import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Logo from "../Logo";
import Main from "../Main";

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
const Container = styled("div")(props => ({}));

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Loads site settings from the database
   */
  const data = Settings(props);

  /**
   * Displays a theme switcher icon
   */
  const themeSwitcherIcon =
    "Displays a theme switcher icon for dark / light mode";

  return (
    <Container className="Home">
      Home
      <ul>
        <li>Settings: {data.url}</li>
        <li>{themeSwitcherIcon}</li>
      </ul>
      <Logo />
      <Main />
    </Container>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
