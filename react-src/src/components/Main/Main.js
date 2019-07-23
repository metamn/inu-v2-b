import React, { useState } from "react";
import PropTypes from "prop-types";

import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "../Categories";
import Posts from "../Posts";
import Pages, { PagesPropTypes, PagesDefaultProps } from "../Pages";
import Menu from "../Menu";
import Content, { ContentPropTypes } from "../Content";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The default menu item Id
   */
  defaultMenuItem: PropTypes.string,
  /**
   * The initial state of the menu switcher icon
   */
  defaultMenuSwitcherIconState: PropTypes.bool,
  /**
   * The initial display modes
   */
  defaultContentDisplayMode: ContentPropTypes.activeContentDisplayMode,
  /**
   * The default page query
   */
  defaultPageQuery: PagesPropTypes.variables,
  /**
   * The categories
   */
  categories: PropTypes.shape(CategoriesPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  defaultMenuItem: "1",
  defaultMenuSwitcherIconState: false,
  defaultContentDisplayMode: "slider",
  defaultPageQuery: PagesDefaultProps.variables,
  categories: CategoriesDefaultProps
};

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
    defaultContentDisplayMode,
    defaultPageQuery,
    categories
  } = props;
  console.log("Main");

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
   * Loads posts, pages from the database.
   *
   * They can't be conditionally queried due to hook rules
   */
  const posts = Posts({
    variables: { category: Number(activeMenuItem), first: 100 }
  });

  /**
   * Filters posts having a featured image set
   */
  const edgesWithFeaturedImage = posts.edges.filter(
    edge => edge.node.featuredImage
  );

  const pages = Pages({ variables: defaultPageQuery });
  const contactPageContent = pages.edges[0].node.content;

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
    <>
      <MainContext.Provider value={context}>
        <Menu
          activeMenuItem={activeMenuItem}
          menuSwitcherIconState={menuSwitcherIconState}
          categories={categories}
        />
        <Content
          activeMenuItem={activeMenuItem}
          activeContentDisplayMode={activeContentDisplayMode}
          setActiveContentDisplayMode={setActiveContentDisplayMode}
          contentSwitcherClickHandler={contentSwitcherClickHandler}
          edgesWithFeaturedImage={edgesWithFeaturedImage}
          contactPageContent={contactPageContent}
        />
      </MainContext.Provider>
    </>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
export { propTypes, defaultProps, MainContext };
