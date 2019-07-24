import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

import Category, { CategoryPropTypes, CategoryDefaultProps } from "../Category";

/**
 * Defines the prop types.
 */
const propTypes = {
  /**
   * The categories.
   */
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(CategoryPropTypes) })
  ),
  /**
   * The query variables.
   */
  variables: PropTypes.shape({
    hideEmpty: PropTypes.bool
  })
};

/**
 * Defines the default props.
 */
const defaultProps = {
  edges: Array(1).fill({ node: CategoryDefaultProps }),
  variables: {
    hideEmpty: true
  }
};

/**
 * Defines the database query.
 */
const query = gql`
  query Categories($hideEmpty: Boolean) {
    categories(where: { hideEmpty: $hideEmpty, orderby: TERM_ORDER }) {
      edges {
        node {
          ...CategoryNode
        }
      }
    }
  }
  ${Category.fragments.node}
`;

/**
 * Loads categories from the database.
 */
const Categories = props => {
  const { edges, variables } = props;

  return useData(edges, query, "categories", variables);
};

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;

export default Categories;
export {
  propTypes as CategoriesPropTypes,
  defaultProps as CategoriesDefaultProps
};
