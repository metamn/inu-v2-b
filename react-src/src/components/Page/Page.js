import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The page content
   */
  content: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  content: "Page content"
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
 * Displays the component
 */
const Page = props => {
  /**
   * Displays the page content
   */
  const { content } = props;

  return (
    <Container className="Page">
      Page
      <ul>
        <li>{content}</li>
      </ul>
    </Container>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
export { propTypes, defaultProps };
