import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

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
 * Loads a list of posts associated to a category
 */
const Posts = props => {
  return useData(defaultProps, query, "posts");
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes, defaultProps };
