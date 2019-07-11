import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { stringify } from "flatted";

import { useData } from "../../hooks";

import Category, { CategoryPropTypes, CategoryDefaultProps } from "../Category";
import MenuItem from "../MenuItem";

/**
 * Defines the prop types
 */
const propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(CategoryPropTypes) })
  )
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: CategoryDefaultProps })
};

/**
 * Defines the database query
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
 * Converts categories to menu items
 */
const convertCategoriesToMenuItems = props => {
  const { categories } = props;

  console.log("categories:" + stringify(categories));

  return categories.edges.map((edge, index) => {
    return <MenuItem key={`category-${index}`} name={edge.node.name} />;
  });
};

/**
 * Loads categories from the database
 */
const Categories = () => {
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
export {
  propTypes as CategoriesPropTypes,
  defaultProps as CategoriesDefaultProps,
  convertCategoriesToMenuItems as ConvertCategoriesToMenuItems
};
