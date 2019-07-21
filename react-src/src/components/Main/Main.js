import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Menu from "../Menu";
import Content, { ContentPropTypes } from "../Content";

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
   * The display modes
   */
  defaultContentDisplayMode: ContentPropTypes.activeContentDisplayMode
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
const MainContainer = styled("main")(props => ({}));

/**
 * Creates a context for the component.
 */
const MainContext = React.createContext({});

/**
 * Gets the display mode.
 *
 * A reusable helper for setting the active display mode.
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

  /**
   * Sets up context variables
   */
  const context = {
    /**
     * Used in MenuDropdown
     */
    menuSwitcherClickHandler: menuSwitcherClickHandler,
    /**
     * Used in MenuItem
     */
    menuItemClickHandler: menuItemClickHandler
  };

  return (
    <MainContainer className="Main">
      <MainContext.Provider value={context}>
        <Menu
          activeMenuItem={activeMenuItem}
          menuSwitcherIconState={menuSwitcherIconState}
        />
        <Content
          activeMenuItem={activeMenuItem}
          activeContentDisplayMode={activeContentDisplayMode}
          setActiveContentDisplayMode={setActiveContentDisplayMode}
          contentSwitcherClickHandler={contentSwitcherClickHandler}
        />
      </MainContext.Provider>
    </MainContainer>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps, MainContext };
