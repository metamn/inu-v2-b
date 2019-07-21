import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import IconToggle, {
  IconTogglePropTypes,
  IconToggleDefaultProps
} from "../IconToggle";
import { MainContext } from "../Main";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The toggle icon
   */
  ...IconTogglePropTypes,
  /**
   * The rendered menu items
   */
  children: PropTypes.node
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...IconToggleDefaultProps,
  children: <li>Menu item</li>
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "var(--lem) 0",
  borderTop: "1px solid",
  borderBottom: "1px solid",

  "& .MenuItems": {
    order: "-1",
    marginRight: "var(--lem)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  "&.toggled": {
    "& .MenuItems": {
      "& .MenuItem": {
        padding: "calc(var(--lem) / 2) 0",

        "& +.MenuItem": {
          borderTop: "1px solid"
        }
      }
    }
  }
}));

/**
 * Sets the menu item status for items in a dropdown menu.
 */
const setMenuItemStatusForDropdown = props => {
  const { id, activeMenuItem, menuSwitcherIconState } = props;

  return id === activeMenuItem
    ? "active"
    : menuSwitcherIconState
    ? "inactive"
    : "hidden";
};

/**
 * Displays the component
 */
const MenuDropdown = props => {
  const { toggled, children, icon1, icon2 } = props;

  /**
   * Displays the dropdown icons
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const toggleIconUp = icons.chevronUp ? { children: icons.chevronUp } : icon1;
  const toggleIconDown = icons.chevronDown
    ? { children: icons.chevronDown }
    : icon2;

  /**
   * Creates a class name to mark the status of the component
   */
  const status = toggled ? "toggled" : "";

  /**
   * Loads the click handler from Context
   *
   * This is a special extension to the component to suit this project.
   */
  const { menuSwitcherClickHandler } = useContext(MainContext);

  return (
    <Container className={`MenuDropdown ${status}`}>
      <IconToggle
        icon1={toggleIconDown}
        icon2={toggleIconUp}
        toggled={toggled}
        onClick={() =>
          typeof menuSwitcherClickHandler === "function"
            ? menuSwitcherClickHandler()
            : null
        }
      />
      <ul className="MenuItems">{children}</ul>
    </Container>
  );
};

MenuDropdown.propTypes = propTypes;
MenuDropdown.defaultProps = defaultProps;

export default MenuDropdown;
export {
  propTypes as MenuDropdownPropTypes,
  defaultProps as MenuDropdownDefaultProps,
  setMenuItemStatusForDropdown
};
