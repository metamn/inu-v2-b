import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

import Post, { PostPropTypes, PostDefaultProps } from "../Post";

/**
 * Defines the prop types
 */
const propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(PostPropTypes) })
  )
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: PostDefaultProps })
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
          ...PostNode
        }
      }
    }
  }
  ${Post.fragments.node}
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
