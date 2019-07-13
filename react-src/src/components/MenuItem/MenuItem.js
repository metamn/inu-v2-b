import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MainContext } from "../Main";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The menu item name
   */
  name: PropTypes.string,
  /**
   * The menu item ID
   */
  id: PropTypes.string,
  /**
   * The menu item status
   */
  status: PropTypes.oneOf(["active", "inactive", "hidden"]),
  /**
   * The menu item click handler
   */
  menuItemClickHandler: PropTypes.func
};

/**
 * Defines the default props
 */
const defaultProps = {
  name: "Menu item",
  id: "1",
  status: "inactive",
  menuItemClickHandler: () => {
    console.log("Menu item clicked");
  }
};

/**
 * Styles the component container
 */
const Container = styled("li")(props => ({
  textDecoration: props.status === "active" ? "line-through" : "none",
  display: props.status === "hidden" ? "none" : "flex",
  cursor: "pointer"
}));

/**
 * Creates menu items
 */
const createMenuItems = menuItems => {
  return menuItems.map((menuItem, index) => (
    <MenuItem key={`MenuItem-${index}`} {...menuItem} />
  ));
};

/**
 * Displays the component
 */
const MenuItem = props => {
  const { name, id, status } = props;
  const { activeMenuItem, menuItemClickHandler } = useContext(MainContext);

  const currentStatus =
    status === "hidden"
      ? "hidden"
      : activeMenuItem === id
      ? "active"
      : "inactive";

  return (
    <Container
      className="MenuItem"
      status={currentStatus}
      onClick={() => menuItemClickHandler(id)}
    >
      {name}
    </Container>
  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
export {
  propTypes as MenuItemPropTypes,
  defaultProps as MenuItemDefaultProps,
  createMenuItems
};
