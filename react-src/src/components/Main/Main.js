import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Menu from "../Menu";
import Content from "../Content";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The ID of current menu item
   */
  currentMenuItem: PropTypes.string,
  /**
   * The menu item click handler
   */
  menuItemClickHandler: PropTypes.func
};

/**
 * Defines the default props
 */
const defaultProps = {
  currentMenuItem: "1",
  menuItemClickHandler: () => {
    console.log("Menu item clicked");
  }
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
 * Creates a context for the menu state
 */
const MainContext = React.createContext({});

/**
 * Displays the component
 */
const Main = props => {
  const { currentMenuItem } = props;

  /**
   * Sets up state for the active menu item
   */
  const [activeMenuItem, setActiveMenuItem] = useState(currentMenuItem);

  /**
   * Manages the click on a menu item
   */
  const menuItemClickHandler = index => {
    console.log("index:" + index);
    setActiveMenuItem(index);
  };

  return (
    <Container className="Main">
      Main
      <MainContext.Provider
        value={{
          activeMenuItem: activeMenuItem,
          menuItemClickHandler: menuItemClickHandler
        }}
      >
        <Menu />
        <Content />
      </MainContext.Provider>
    </Container>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps, MainContext };
