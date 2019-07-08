import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Categories from "../Categories";
import Posts from "../Posts";
import Page from "../Page";
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
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Content = props => {
  return (
    <Container className="Content">
      Content
      <Categories />
      <Menu />
      <Posts />
      <Page />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps };
