import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

  " > * ": {
    border: "1px solid",
    padding: "1.25em",
    margin: "1.25em"
  }
}));

/**
 * Displays the homepage
 */
const Home = props => {
  return (
    <Container className="Home">
      Home
      <Logo />
      <Menu />
    </Container>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
