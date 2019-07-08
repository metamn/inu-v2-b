import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

import Slider from "../Slider";
import Thumbs from "../Thumbs";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Defines the database query
 */
const query = gql`
  query posts($first: Int) {
    posts(first: $first) {
      edges {
        node {
          id
          title
          featuredImage {
            id
            sourceUrl
            mediaDetails {
              file
              height
              width
              sizes {
                file
                height
                mimeType
                name
                sourceUrl
                width
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Posts = props => {
  /**
   * Displays a content switcher icon
   */
  const contentSwitcherIcon = "Content switcher icon (slider vs. thumb view)";

  return (
    <Container className="Posts">
      Posts: with featured image
      <ul>
        <li>{contentSwitcherIcon}</li>
        <ul>
          <li>Active: when a category is displayed</li>
          <li>Inactive: when the Random slideshow is displayed</li>
        </ul>
      </ul>
      <Slider />
      <Thumbs />
    </Container>
  );
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes, defaultProps };
