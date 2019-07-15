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
const createMenuItems = props => {
  /**
   * Retrieves props.
   *
   * Context cannot be used since this is not a hook
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
 * Displays the component
 */
const MenuItem = props => {
  const { name, id, status } = props;
  const { menuItemClickHandler } = useContext(MainContext);

  return (
    <Container
      className="MenuItem"
      status={status}
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
