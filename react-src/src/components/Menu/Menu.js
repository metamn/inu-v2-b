import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { CategoriesPropTypes, CategoriesDefaultProps } from "../Categories";
import MenuItem from "../MenuItem";

/**
 * Defines the prop types
 */
const propTypes = {
  categories: PropTypes.shape(CategoriesPropTypes),
  random: PropTypes.string,
  contact: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  categories: PropTypes.shape(CategoriesDefaultProps),
  random: "Random slideshow",
  contact: "Contact"
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
 * Displays the menu
 */
const Menu = props => {
  /**
   * Displays categories, and `Random`, `Contact` menu items
   */
  const { categories, random, contact } = props;

  /**
   * Displays categories as menu items
   */
  const categoriesAsMenuItems = categories.edges.map(edge => {
    return <MenuItem name={edge.node.name} />;
  });

  /**
   * Displays a menu switcher icon
   */
  const menuSwitcherIcon = "Displays a menu switcher icon (dropdown)";

  return (
    <Container className="Menu">
      Menu
      <ul>
        <li>{menuSwitcherIcon}</li>
      </ul>
      <ul>
        {categoriesAsMenuItems}
        <MenuItem name={random} />
        <MenuItem name={contact} />
      </ul>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
