import React from "react";
import PropTypes from "prop-types";

import { CategoriesPropTypes, CategoriesDefaultProps } from "../Categories";
import MenuItem, { MenuItemPropTypes } from "../MenuItem";
import MenuDropdown, { setMenuItemStatusForDropdown } from "../MenuDropdown";

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
   * The categories
   */
  categories: PropTypes.shape(CategoriesPropTypes),
  /**
   * The `Random` menu item
   */
  random: PropTypes.shape(MenuItemPropTypes),
  /**
   * The `Contact` menu item
   */
  contact: PropTypes.shape(MenuItemPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  activeMenuItem: "1",
  menuSwitcherIconState: false,
  categories: CategoriesDefaultProps,
  random: {
    name: "Random slideshow",
    id: "-1"
  },
  contact: {
    name: "Contact",
    id: "-2"
  }
};

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
    activeMenuItem,
    menuSwitcherIconState,
    categories,
    random,
    contact
  } = props;

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
   * Displays  `Random` and `Contact` menu items
   */
  const customMenuItems = createMenuItems({
    menuItems: [random, contact],
    setStatus: setMenuItemStatusForDropdown,
    menuSwitcherIconState: menuSwitcherIconState,
    activeMenuItem: activeMenuItem
  });

  return (
    <>
      <MenuDropdown toggled={menuSwitcherIconState}>
        {categoriesAsMenuItems}
        {customMenuItems}
      </MenuDropdown>
    </>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
