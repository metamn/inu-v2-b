import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "../Categories";
import MenuItem, { MenuItemPropTypes } from "../MenuItem";
import MenuDropdown, {
  MenuDropdownPropTypes,
  MenuDropdownDefaultProps,
  setMenuItemStatusForDropdown
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
 * Creates menu items.
 */
const createMenuItems = props => {
  /**
   * Retrieves props.
   */
  const { menuItems, menuSwitcherIconState, setStatus, activeMenuItem } = props;

  return menuItems.map(menuItem => {
    const { id, name } = menuItem;

    const newStatus = setStatus({
      id: id,
      activeMenuItem: activeMenuItem,
      menuSwitcherIconState: menuSwitcherIconState
    });

    return (
      <MenuItem key={`MenuItem-${id}`} id={id} name={name} status={newStatus} />
    );
  });
};

/**
 * Converts a category to a menu item.
 */
const categoryToMenuItem = category => {
  const { categoryId, name } = category;

  return { name: name, id: categoryId.toString() };
};

/**
 * Displays the menu.
 */
const Menu = props => {
  const {
    menuSwitcherIconState,
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
    setStatus: setMenuItemStatusForDropdown,
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
    setStatus: setMenuItemStatusForDropdown,
    menuSwitcherIconState: menuSwitcherIconState,
    activeMenuItem: activeMenuItem
  });

  return (
    <Container className="Menu">
      Menu
      <MenuDropdown toggled={menuSwitcherIconState}>
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
