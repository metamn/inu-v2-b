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
  menuItemClickHandler: PropTypes.func,
  /**
   * The initial state of the menu switcher icon
   */
  menuSwitcherIconToggled: PropTypes.bool
};

/**
 * Defines the default props
 */
const defaultProps = {
  currentMenuItem: "1",
  menuItemClickHandler: () => {
    console.log("Menu item clicked");
  },
  menuSwitcherIconToggled: false
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
  const { currentMenuItem, menuSwitcherIconToggled } = props;

  /**
   * Sets up state for the active menu item
   */
  const [activeMenuItem, setActiveMenuItem] = useState(currentMenuItem);

  /**
   * Sets up state for the menu switcher icon
   */
  const [menuSwitcherIconState, setMenuSwitcherIconState] = useState(
    menuSwitcherIconToggled
  );

  /**
   * Manages the click on a menu item
   */
  const menuItemClickHandler = index => {
    if (index === activeMenuItem) return;

    setActiveMenuItem(index);
    setMenuSwitcherIconState(!menuSwitcherIconState);
  };

  /**
   * Manages the click on the menu switcher icon
   */
  const menuSwitcherClickHandler = () => {
    setMenuSwitcherIconState(!menuSwitcherIconState);
  };

  return (
    <Container className="Main">
      Main
      <MainContext.Provider
        value={{
          activeMenuItem: activeMenuItem,
          menuItemClickHandler: menuItemClickHandler,
          menuSwitcherIconState: menuSwitcherIconState,
          menuSwitcherClickHandler: menuSwitcherClickHandler
        }}
      >
        <Menu />
        <Content activeMenuItem={activeMenuItem} />
      </MainContext.Provider>
    </Container>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps, MainContext };
