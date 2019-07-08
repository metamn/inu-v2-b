import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Posts from "../Posts";
import Page from "../Page";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";

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
  /**
   * Displays a content switcher icon
   */
  const contentSwitcherIcon = "Content switcher icon (slider vs. thumb view)";

  return (
    <Container className="Content">
      Content
      <Posts />
      <Page />
      <ul>
        <li>{contentSwitcherIcon}</li>
        <ul>
          <li>Active: when a category is displayed</li>
          <li>Inactive: when the Random slideshow or Contact is displayed</li>
        </ul>
      </ul>
      <Slider />
      <Thumbs />
      <Contact />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps };
