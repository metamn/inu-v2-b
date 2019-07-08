import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Settings from "../Settings";
import Logo from "../Logo";
import Menu from "../Menu";

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
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",

  "& ul.data li": {
    backgroundColor: "#eee",
    padding: ".625em",
    marginBottom: "1px"
  },

  "& .Settings, & .Categories, & .Page, & .Posts": {
    backgroundColor: "#eee"
  }
}));

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Displays a theme switcher icon
   */
  const themeSwitcherIcon = "Theme switcher icon (dark / light mode)";

  return (
    <Container className="Home">
      Home
      <Settings />
      <ul>
        <li>{themeSwitcherIcon}</li>
      </ul>
      <Logo />
      <Menu />
    </Container>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
