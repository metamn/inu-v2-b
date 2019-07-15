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
   * The ID of default menu item
   */
  defaultMenuItem: PropTypes.string,
  /**
   * The initial state of the menu switcher icon
   */
  defaultMenuSwitcherIconState: PropTypes.bool,
  /**
   * The display modes:
   *
   * `blank` - When the menu is visible
   * `slider` - When a category or Random slideshow is displayed
   * `thumbs` - When a category is displayd`
   * `page` - When the Contact page is displayed
   * ``
   */
  defaultContentDisplayMode: PropTypes.oneOf([
    "blank",
    "slider",
    "thumbs",
    "page"
  ])
};

/**
 * Defines the default props
 */
const defaultProps = {
  defaultMenuItem: "1",
  defaultMenuSwitcherIconState: false,
  defaultContentDisplayMode: "slider"
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
 * Creates a context for the component.
 */
const MainContext = React.createContext({});

/**
 * Gets the display mode.
 */
const getDisplayMode = activeMenuItem => {
  return activeMenuItem === "-2" ? "page" : "slider";
};

/**
 * Displays and manages the interactions of the menu and the content
 */
const Main = props => {
  const {
    defaultMenuItem,
    defaultMenuSwitcherIconState,
    defaultContentDisplayMode
  } = props;

  /**
   * Sets up state for the active menu item
   */
  const [activeMenuItem, setActiveMenuItem] = useState(defaultMenuItem);

  /**
   * Sets up state for the menu switcher icon
   */
  const [menuSwitcherIconState, setMenuSwitcherIconState] = useState(
    defaultMenuSwitcherIconState
  );

  /**
   * Sets up state to manage the display mode.
   */
  const [activeContentDisplayMode, setActiveContentDisplayMode] = useState(
    defaultContentDisplayMode
  );

  /**
   * Manages the click on a menu item
   */
  const menuItemClickHandler = index => {
    if (index === activeMenuItem) return;

    setActiveMenuItem(index);
    setActiveContentDisplayMode(getDisplayMode(index));
    setMenuSwitcherIconState(!menuSwitcherIconState);
  };

  /**
   * Manages the click on the menu switcher icon
   */
  const menuSwitcherClickHandler = () => {
    setMenuSwitcherIconState(!menuSwitcherIconState);

    setActiveContentDisplayMode(
      menuSwitcherIconState ? getDisplayMode(activeMenuItem) : "blank"
    );
  };

  /**
   * Manages the click on the content switcher icon
   */
  const contentSwitcherClickHandler = () => {
    const newDisplay =
      activeContentDisplayMode === "slider" ? "thumbs" : "slider";
    setActiveContentDisplayMode(newDisplay);
  };

  return (
    <Container className="Main">
      Main
      <MainContext.Provider
        value={{
          /**
           * Used in <Image>
           */
          activeContentDisplayMode: activeContentDisplayMode,
          /**
           * Used in <MenuItem>
           */
          menuItemClickHandler: menuItemClickHandler
        }}
      >
        <Menu
          activeMenuItem={activeMenuItem}
          menuSwitcherIconState={menuSwitcherIconState}
          menuSwitcherClickHandler={menuSwitcherClickHandler}
        />
        <Content
          activeMenuItem={activeMenuItem}
          activeContentDisplayMode={activeContentDisplayMode}
          setActiveContentDisplayMode={setActiveContentDisplayMode}
          contentSwitcherClickHandler={contentSwitcherClickHandler}
        />
      </MainContext.Provider>
    </Container>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps, MainContext };
