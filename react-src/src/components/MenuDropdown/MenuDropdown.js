import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import IconToggle, {
  IconTogglePropTypes,
  IconToggleDefaultProps
} from "../IconToggle";

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
const Container = styled("div")(props => ({}));

/**
 * Sets the dropdown menu item status
 */
const setMenuDropdownItemStatus = props => {
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
  const { toggled, toggleIconClickHandler, children, icon1, icon2 } = props;

  /**
   * Displays the dropdown icons
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const toggleIconUp = icons.chevronUp ? icons.chevronUp : icon1;
  const toggleIconDown = icons.chevronDown ? icons.chevronDown : icon2;

  return (
    <Container className="MenuDropdown">
      <IconToggle
        icon1={toggleIconDown}
        icon2={toggleIconUp}
        toggled={toggled}
        toggleIconClickHandler={toggleIconClickHandler}
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
  setMenuDropdownItemStatus
};
