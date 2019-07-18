import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "../Categories";
import { categoryToMenuItem } from "../Category";
import { MenuItemPropTypes, createMenuItems } from "../MenuItem";
import MenuDropdown, {
  MenuDropdownPropTypes,
  MenuDropdownDefaultProps,
  setMenuDropdownItemStatus
} from "../MenuDropdown";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The active menu item
   */
  activeMenuItem: PropTypes.string,
  /**
   * The state of the menu switcher icon
   */
  menuSwitcherIconState: PropTypes.bool,
  /**
   * The menu switcher click handler
   */
  menuSwitcherClickHandler: PropTypes.func,
  /**
   * The `Random` menu item
   */
  random: PropTypes.shape(MenuItemPropTypes),
  /**
   * The `Contact` menu item
   */
  contact: PropTypes.shape(MenuItemPropTypes),
  /**
   * The drowpdown menu
   */
  ...MenuDropdownPropTypes,
  /**
   * The default category query
   */
  defaultCategoriesQuery: CategoriesPropTypes.variables
};

/**
 * Defines the default props
 */
const defaultProps = {
  activeMenuItem: "1",
  menuSwitcherIconState: false,
  menuSwitcherClickHandler: () => {
    console.log("Menu switcher clicked");
  },
  random: {
    name: "Random slideshow",
    id: "-1"
  },
  contact: {
    name: "Contact",
    id: "-2"
  },
  ...MenuDropdownDefaultProps,
  defaultCategoriesQuery: CategoriesDefaultProps.variables
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
  const {
    menuSwitcherIconState,
    menuSwitcherClickHandler,
    activeMenuItem,
    defaultCategoriesQuery
  } = props;

  /**
   * Loads categories
   */
  const categories = Categories({ variables: defaultCategoriesQuery });

  /**
   * Displays categories as menu items
   */
  const categoriesAsMenuItems = createMenuItems({
    menuItems: categories.edges.map(edge => categoryToMenuItem(edge.node)),
    setStatus: setMenuDropdownItemStatus,
    menuSwitcherIconState: menuSwitcherIconState,
    activeMenuItem: activeMenuItem
  });

  /**
   * Loads `Random` and `Contact` menu items
   */
  const { random, contact } = props;

  /**
   * Displays  `Random` and `Contact` menu items
   */
  const customMenuItems = createMenuItems({
    menuItems: [random, contact],
    setStatus: setMenuDropdownItemStatus,
    menuSwitcherIconState: menuSwitcherIconState,
    activeMenuItem: activeMenuItem
  });

  return (
    <Container className="Menu">
      Menu
      <MenuDropdown
        toggled={menuSwitcherIconState}
        toggleIconClickHandler={menuSwitcherClickHandler}
      >
        {categoriesAsMenuItems}
        {customMenuItems}
      </MenuDropdown>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
