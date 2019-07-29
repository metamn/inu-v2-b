import PropTypes from "prop-types";
import gql from "graphql-tag";

/**
 * Defines the prop types.
 *
 * Used only to describe the schema. It will be re-used by `Categories`.
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
 * Defines the default props.
 */
const defaultProps = {
  id: "1",
  categoryId: 1,
  name: "/ / / / / / / /"
};

/**
 * Defines the query fragment needed by the component.
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
 * Returns nothing. Used only for its PropTypes.
 */
const Category = props => {
  return null;
};

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;
Category.fragments = queryFragment;

export default Category;
export { propTypes as CategoryPropTypes, defaultProps as CategoryDefaultProps };
