import PropTypes from "prop-types";
import gql from "graphql-tag";

/**
 * Defines the prop types.
 *
 * Used only to describe the schema. It will be re-used by `Pages`.
 */
const propTypes = {
  /**
   * The page id
   */
  id: PropTypes.string,
  /**
   * The page title
   */
  title: PropTypes.string,
  /**
   * The page content
   */
  content: PropTypes.string
};

/**
 * Defines the default props.
 */
const defaultProps = {
  id: "1",
  title: "Contact",
  content: "Contact page content"
};

/**
 * Defines the query fragment needed by the component.
 */
const queryFragment = {
  node: gql`
    fragment PageNode on Page {
      id
      title
      content
    }
  `
};

/**
 * Returns nothing. Used only for its propTypes (and methods).
 */
const Page = props => {
  return "Returns nothing. Used only for its PropTypes.";
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
Page.fragments = queryFragment;

export default Page;
export { propTypes as PagePropTypes, defaultProps as PageDefaultProps };
