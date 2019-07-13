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
  menuItemClickHandler: () => {
    console.log("Menu item clicked");
  }
};

/**
 * Styles the component container
 */
const Container = styled("li")(props => ({}));

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
  const { name, id } = props;
  const { activeMenuItem, menuItemClickHandler } = useContext(MainContext);

  return (
    <Container className="MenuItem" onClick={() => menuItemClickHandler(id)}>
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
