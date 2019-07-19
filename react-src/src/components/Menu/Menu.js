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
 * Converts a category to a menu item
 */
const categoryToMenuItem = category => {
  const { categoryId, name } = category;

  return { name: name, id: categoryId.toString() };
};

/**
 * Creates a context for the icon and menu item click.
 */
const MenuContext = React.createContext({});

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
      <MenuContext.Provider value={menuSwitcherClickHandler}>
        <MenuDropdown toggled={menuSwitcherIconState}>
          {categoriesAsMenuItems}
          {customMenuItems}
        </MenuDropdown>
      </MenuContext.Provider>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps, MenuContext };
