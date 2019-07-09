import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

/**
 * Defines the Page prop type
 */
const pagePropType = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

/**
 * Defines the Page default props
 */
const pageDefaultProps = {
  id: "1",
  title: "Page",
  content: "Page content"
};

/**
 * Defines the prop types
 */
const propTypes = {
  node: PropTypes.shape(pagePropType),
  edges: PropTypes.arrayOf(PropTypes.shape(pagePropType))
};

/**
 * Defines the default props
 */
const defaultProps = {
  node: pageDefaultProps,
  edges: [pageDefaultProps]
};

/**
 * Defines the database query
 */
const query = gql`
  query page($first: Int, $where: RootQueryToPageConnectionWhereArgs!) {
    pages(first: $first, where: $where) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`;

/**
 * Loads a page from the database
 */
const Pages = props => {
  return useData(defaultProps, query, "pages");
};

Pages.propTypes = propTypes;
Pages.defaultProps = defaultProps;

export default Pages;
export { propTypes, defaultProps };
