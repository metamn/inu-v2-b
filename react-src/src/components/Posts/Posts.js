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
   * The query variables
   */
  variables: PropTypes.shape({
    /**
     * The category from where the posts are loaded
     */
    category: PropTypes.number,
    /**
     * How many posts to load? Max. 100 (hard coded in WPGraphQL)
     */
    first: PropTypes.number
  })
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: PostDefaultProps }),
  variables: {
    categoryId: 1,
    first: 50
  }
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
  const { variables } = props;

  return useData(defaultProps, query, "posts", variables);
};

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default Posts;
export { propTypes as PostsPropTypes, defaultProps as PostsDefaultProps };
