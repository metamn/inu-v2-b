import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Displays the component
 */
const Category = props => {
  return <Container className="Category">Category</Container>;
};

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;
Category.fragments = queryFragment;

export default Category;
export { propTypes as CategoryPropTypes, defaultProps as CategoryDefaultProps };