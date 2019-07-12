import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The page id
   */
  id: PropTypes.string,
  /**
   * The page title
   */
  title: PropTypes.string,
  /**
   * The page content
   */
  content: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: "1",
  title: "Contact",
  content: "Contact page content"
};

/**
 * Defines the query fragment needed by the component
 */
const queryFragment = {
  node: gql`
    fragment PageNode on Page {
      id
      title
      content
    }
  `
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Displays the component
 */
const Page = props => {
  return <Container className="Page">Page</Container>;
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
Page.fragments = queryFragment;

export default Page;
export { propTypes as PagePropTypes, defaultProps as PageDefaultProps };
