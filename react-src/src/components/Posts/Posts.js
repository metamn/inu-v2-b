import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

import Post, { PostPropTypes, PostDefaultProps } from "../Post";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The posts
   */
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(PostPropTypes) })
  ),
  /**
   * The category from where the posts are loaded
   */
  categoryId: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: PostDefaultProps }),
  categoryId: 1
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
 * Loads a list of posts associated to a category (with featured images)
 */
const Posts = props => {
  const { categoryId } = props;

  /**
   * Defines which category to load posts from
   */
  const variables = {
    /**
     * 100 is hard coded in WPGraphQL
     */
    first: 100,
    category: categoryId
  };

  return useData(defaultProps, query, "posts", variables);
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes, defaultProps };
