import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

/**
 * Defines prop types for Category
 */
const categoryPropTypes = {
  id: PropTypes.string,
  categoryId: PropTypes.number,
  name: PropTypes.string
};

/**
 * Defines default props for Category
 */
const defaultCategoryPropTypes = {
  id: "1",
  categoryId: 1,
  name: "Category"
};

/**
 * Defines the prop types
 */
const propTypes = {
  node: PropTypes.shape(categoryPropTypes),
  edges: PropTypes.arrayOf(PropTypes.shape(categoryPropTypes))
};

/**
 * Defines the default props
 */
const defaultProps = {
  node: defaultCategoryPropTypes,
  edges: [defaultCategoryPropTypes]
};

/**
 * Defines the database query
 */
const query = gql`
  query Categories($hideEmpty: Boolean) {
    categories(where: { hideEmpty: $hideEmpty, orderby: TERM_ORDER }) {
      edges {
        node {
          id
          categoryId
          name
        }
      }
    }
  }
`;

/**
 * Loads categories from the database
 */
const Categories = props => {
  /**
   * Excludes empty categories
   */
  const variables = {
    hideEmpty: true
  };

  return useData(defaultProps, query, "categories", variables);
};

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;

export default Categories;
export { propTypes, defaultProps };
