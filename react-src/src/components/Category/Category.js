import PropTypes from "prop-types";
import gql from "graphql-tag";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The category GraphQL id
   */
  id: PropTypes.string,
  /**
   * The category id
   */
  categoryId: PropTypes.number,
  /**
   * The category name
   */
  name: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: "1",
  categoryId: 1,
  name: "Category"
};

/**
 * Defines the query fragment needed by the component
 */
const queryFragment = {
  node: gql`
    fragment CategoryNode on Category {
      id
      categoryId
      name
    }
  `
};

/**
 * Converts a category to a menu item
 */
const categoryToMenuItem = category => {
  const { categoryId, name } = category;

  return { name: name, id: categoryId.toString() };
};

/**
 * Returns nothing. Used only for its propTypes (and methods).
 */
const Category = props => {
  return null;
};

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;
Category.fragments = queryFragment;

export default Category;
export {
  propTypes as CategoryPropTypes,
  defaultProps as CategoryDefaultProps,
  categoryToMenuItem
};
