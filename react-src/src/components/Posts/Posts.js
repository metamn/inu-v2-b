import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

/**
 * Defines the Post prop type
 */
const postPropType = {
  id: PropTypes.string,
  title: PropTypes.string,
  featuredImage: PropTypes.string
};

/**
 * Defines the Post default props
 */
const postDefaultProps = {
  id: "1",
  title: "Post",
  featuredImage: "Post featured image"
};

/**
 * Defines the prop types
 */
const propTypes = {
  node: PropTypes.shape(postPropType),
  edges: PropTypes.arrayOf(PropTypes.shape(postPropType))
};

/**
 * Defines the default props
 */
const defaultProps = {
  node: postDefaultProps,
  edges: Array(1).fill(postDefaultProps)
};

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
  const { node } = props;

  return (
    <Container className="Posts">
      Posts
      <ul>
        <li>
          Loads a list of posts associated to a category (with{" "}
          {node.featuredImage})
        </li>
      </ul>
    </Container>
  );
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes, defaultProps };
