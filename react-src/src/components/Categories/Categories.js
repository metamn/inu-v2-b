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
    categoryId: PropTypes.number,
    name: PropTypes.string
  }),
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.number,
      name: PropTypes.string
    })
  )
};

/**
 * Defines the default props
 */
const defaultProps = {
  node: {
    id: "1",
    categoryId: 1,
    name: "Category"
  },
  edges: [{ id: "1", categoryId: 1, name: "Category" }]
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
const Categories = props => {
  /**
   * Loads a list of categories from the database
   */
  const { edges } = props;

  return (
    <Container className="Categories">
      <span>Categories: edges</span>
    </Container>
  );
};

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;

export default Categories;
export { propTypes, defaultProps };
