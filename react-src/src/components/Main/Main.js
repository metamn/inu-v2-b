import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { stringify } from "flatted";

import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "../Categories";
import Menu from "../Menu";
import Content from "../Content";

/**
 * Defines the prop types
 */
const propTypes = {
  ...CategoriesPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...CategoriesDefaultProps
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Main = props => {
  /**
   * Loads categories from the database
   */
  const categories = Categories(props);

  return (
    <Container className="Main">
      Main
      <div>Nr. of Categories: {categories.edges.length}</div>
      <Menu />
      <Content />
    </Container>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps };
