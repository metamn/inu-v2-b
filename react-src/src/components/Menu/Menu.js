import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Categories, { ConvertCategoriesToMenuItems } from "../Categories";
import MenuItem from "../MenuItem";
import IconToggle from "../IconToggle";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The `Random` menu item
   */
  random: PropTypes.string,
  /**
   * The `Contact` menu item
   */
  contact: PropTypes.string,
  /**
   * The toggle down icon
   */
  toggleIconDown: PropTypes.string,
  /**
   * The toggle up icon
   */
  toggleIconUp: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  random: "Random slideshow",
  contact: "Contact",
  toggleIconDown: "Toggle icon down",
  toggleIconUp: "Toggle icon up"
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
   * Loads categories
   */
  const categories = Categories();

  /**
   * Loads `Random`, and `Contact` menu items
   */
  const { random, contact } = props;

  /**
   * Displays categories as menu items
   */
  const categoriesAsMenuItems = ConvertCategoriesToMenuItems({
    categories: categories
  });

  /**
   * Displays a menu switcher icon
   */
  const { toggleIconUp, toggleIconDown } = props;

  return (
    <Container className="Menu">
      Menu
      <IconToggle icon1={toggleIconDown} icon2={toggleIconUp} />
      <ul>
        {categoriesAsMenuItems}
        <MenuItem key="random" name={random} />
        <MenuItem key="contact" name={contact} />
      </ul>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
