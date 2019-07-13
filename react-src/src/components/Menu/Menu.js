import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import Categories from "../Categories";
import { categoryToMenuItem } from "../Category";
import { MenuItemPropTypes, createMenuItems } from "../MenuItem";
import IconToggle from "../IconToggle";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The `Random` menu item
   */
  random: PropTypes.shape(MenuItemPropTypes),
  /**
   * The `Contact` menu item
   */
  contact: PropTypes.shape(MenuItemPropTypes),
  /**
   * The toggle down icon
   */
  toggleIconDown: PropTypes.string,
  /**
   * The toggle up icon
   */
  toggleIconUp: PropTypes.string,
  /**
   * The initial icon toggle status
   */
  toggled: PropTypes.bool
};

/**
 * Defines the default props
 */
const defaultProps = {
  random: {
    name: "Random slideshow",
    id: "-1"
  },
  contact: {
    name: "Contact",
    id: "-2"
  },
  toggleIconDown: "Toggle icon down",
  toggleIconUp: "Toggle icon up",
  toggled: false
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
  const { toggled } = props;

  /**
   * Displays a menu switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const toggleIconUp = icons.chevronUp;
  const toggleIconDown = icons.chevronDown;

  /**
   * Sets up state for the menu switcher icon
   */
  const [menuSwitcherIcon, setMenuSwitcherIcon] = useState(toggled);

  /**
   * Manages the click on the menu switcher icon
   */
  const menuSwitcherClickHandler = () => {
    setMenuSwitcherIcon(!menuSwitcherIcon);
  };

  /**
   * Loads categories
   */
  const categories = Categories();

  /**
   * Displays categories as menu items
   */
  const categoriesAsMenuItems = createMenuItems(
    categories.edges.map(edge => categoryToMenuItem(edge.node))
  );

  /**
   * Loads `Random` and `Contact` menu items
   */
  const { random, contact } = props;

  /**
   * Displays  `Random` and `Contact` menu items
   */
  const customMenuItems = createMenuItems([random, contact]);

  return (
    <Container className="Menu">
      Menu
      <IconToggle
        icon1={toggleIconDown}
        icon2={toggleIconUp}
        toggled={menuSwitcherIcon}
        toggleIconClickHandler={menuSwitcherClickHandler}
      />
      <ul>
        {categoriesAsMenuItems}
        {customMenuItems}
      </ul>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
