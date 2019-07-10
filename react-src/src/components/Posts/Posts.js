import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

/**
 * Defines the Post prop type
 */
const postPropTypes = {
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
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(postPropTypes) })
  )
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: postDefaultProps })
};

/**
 * Defines the database query
 */
const query = gql`
  query postsFromCategory($first: Int, $category: Int) {
    posts(first: $first, where: { categoryId: $category }) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
  /**
   * Defines which category to load posts from
   */
  const variables = {
    first: 1,
    categoryId: 1
  };

  return useData(defaultProps, query, "posts", variables);
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes, defaultProps };
