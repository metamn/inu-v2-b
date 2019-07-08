import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Settings from "../Settings";
import Logo from "../Logo";
import Main from "../Main";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

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
  const data = Settings;

  /**
   * Displays a theme switcher icon
   */
  const themeSwitcherIcon =
    "Displays a theme switcher icon for dark / light mode";

  return (
    <Container className="Home">
      Home
      <ul>
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
