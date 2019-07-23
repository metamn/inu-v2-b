import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

import Page, { PageDefaultProps, PagePropTypes } from "../Page";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The pages
   */
  edges: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(PagePropTypes) })
  ),
  /**
   * The query variables
   */
  variables: PropTypes.shape({
    first: PropTypes.number,
    where: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

/**
 * Defines the default props
 */
const defaultProps = {
  edges: Array(1).fill({ node: PageDefaultProps }),
  variables: {
    first: 1,
    where: {
      title: "Contact"
    }
  }
};

/**
 * Defines the database query
 */
const query = gql`
  query page($first: Int, $where: RootQueryToPageConnectionWhereArgs!) {
    pages(first: $first, where: $where) {
      edges {
        node {
          ...PageNode
        }
      }
    }
  }
  ${Page.fragments.node}
`;

/**
 * Loads the Contact page from the database
 */
const Pages = props => {
  const { variables } = props;
  console.log("Pages");

  return useData(defaultProps, query, "pages", variables);
};

Pages.propTypes = propTypes;
Pages.defaultProps = defaultProps;

export default Pages;
export { propTypes as PagesPropTypes, defaultProps as PagesDefaultProps };
