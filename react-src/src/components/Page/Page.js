import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

/**
 * Defines the prop types
 */
const propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  }),
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string
    })
  )
};

/**
 * Defines the default props
 */
const defaultProps = {
  node: {
    id: "1",
    title: "Contact",
    content: "Contact page content"
  },
  edges: [{ id: "1", title: "Contact", content: "Contact page content" }]
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
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Page = props => {
  /**
   * Displays the Contact page content
   */
  const { node } = props;

  return (
    <Container className="Page">
      <span>Page: {node.content}</span>
    </Container>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
export { propTypes, defaultProps };
