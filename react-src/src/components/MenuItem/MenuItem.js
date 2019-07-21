import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";
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
  status: PropTypes.oneOf(["active", "inactive", "hidden"])
};

/**
 * Defines the default props
 */
const defaultProps = {
  name: "Menu item",
  id: "1",
  status: "inactive"
};

/**
 * Styles the component container
 */
const Container = styled("li")(props => ({
  ...props.theme.links.default,
  textDecoration: props.status === "active" ? "line-through" : "none",
  display: props.status === "hidden" ? "none" : "flex",
  cursor: "pointer"
}));

/**
 * Displays a menu item
 */
const MenuItem = props => {
  const { name, id, status } = props;

  /**
   * Loads theme
   */
  const { theme } = useTheme();

  /**
   * Manages click on menu item via Context
   *
   * This is a special extension to the component to suit this project.
   */
  const { menuItemClickHandler } = useContext(MainContext);

  return (
    <Container
      className="MenuItem"
      status={status}
      theme={theme}
      onClick={() =>
        typeof menuItemClickHandler === "function"
          ? menuItemClickHandler(id)
          : null
      }
    >
      {name}
    </Container>
  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
export { propTypes as MenuItemPropTypes, defaultProps as MenuItemDefaultProps };
