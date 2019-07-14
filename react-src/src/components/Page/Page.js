import PropTypes from "prop-types";
import gql from "graphql-tag";

/**
 * Defines the prop types
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
 * Defines the default props
 */
const defaultProps = {
  id: "1",
  title: "Contact",
  content: "Contact page content"
};

/**
 * Defines the query fragment needed by the component
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
 * Does nothing. Usied only for its propTypes (and methods).
 */
const Page = props => {
  return null;
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
Page.fragments = queryFragment;

export default Page;
export { propTypes as PagePropTypes, defaultProps as PageDefaultProps };
