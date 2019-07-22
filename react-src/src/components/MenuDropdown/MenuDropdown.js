import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme, Media } from "./../../hooks";

import IconToggle, {
  IconTogglePropTypes,
  IconToggleDefaultProps
} from "../IconToggle";
import { MainContext } from "../Main";
import { Nav as _Nav } from "../SemanticHTML";

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
 * Styles the component for mobiles
 */
const NavMobile = {
  borderTop: "1px solid",
  borderBottom: "1px solid"
};

/**
 * Styles the component for tablets
 */
const NavTablet = {
  border: "none"
};

/**
 * Styles the component container
 */
const Nav = styled(_Nav)(props => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  height: "calc(var(--lem) * 2)",
  margin: "var(--lem) 0",

  "& .MenuItems": {
    order: "-1",
    marginRight: "var(--lem)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  "&.toggled": {
    height: "auto",
    alignItems: "start",

    "& .MenuItems": {
      "& .MenuItem": {
        padding: "calc(var(--lem) / 2) 0",

        "& +.MenuItem": {
          borderTop: "1px solid"
        }
      }
    }
  },

  [`${Media.mobile}`]: {
    ...NavMobile
  },

  [`${Media.tablet}`]: {
    ...NavTablet
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
    <Nav className={`MenuDropdown ${status}`} title="Dropdown menu">
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
    </Nav>
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
