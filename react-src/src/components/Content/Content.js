import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import Posts from "../Posts";
import Pages from "../Pages";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The content switcher icon
   */
  contentSwitcherIcon: PropTypes.string,
  /**
   * The display modes:
   *
   * `blank` - When the menu is visible
   * `slider` - When a category or Random slideshow is displayed
   * `thumbs` - When a category is displayd`
   * `page` - When the Contact page is displayed
   * ``
   */
  contentDisplayMode: PropTypes.oneOf(["blank", "slider", "thumbs", "page"]),
  /**
   * The active image (slide or thumb)
   */
  currentImage: PropTypes.number,
  /**
   * The active menu item id
   */
  activeMenuItem: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  contentSwitcherIcon: "Contet switcher icon",
  contentDisplayMode: "slider",
  currentImage: 1,
  activeMenuItem: 1
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  position: "relative"
}));

/**
 * Creates a context for the display mode
 */
const ContentContext = React.createContext({});

/**
 * Displays the component
 */
const Content = props => {
  const { contentDisplayMode, currentImage, activeMenuItem } = props;

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const contentSwitcherIcon = icons.grid;

  /**
   * Sets up state to manage the display mode.
   */
  const [activeContentDisplayMode, setActiveContentDisplayMode] = useState(
    contentDisplayMode
  );

  /**
   * Manages the click on the content switcher icon
   */
  const contentSwitcherClickHandler = () => {
    const newDisplay =
      activeContentDisplayMode === "slider" ? "thumbs" : "slider";
    setActiveContentDisplayMode(newDisplay);
  };

  /**
   * Sets up state to mark the active image (thumb, or slide)
   */
  const [activeImage, setActiveImage] = useState(currentImage);

  /**
   * Loads a list of posts associated to a category
   */
  const posts = Posts({ categoryId: activeMenuItem });

  /**
   * Filters posts having a featured image set
   */
  const edgesWithFeaturedImage = posts.edges.filter(
    edge => edge.node.featuredImage
  );

  /**
   * Loads the Contact page from the database
   */
  const pages = Pages();
  const contactPageContent = pages.edges[0].node.content;

  /**
   * Decides which content to be displayed
   */
  const DisplayContent = () => {
    switch (activeContentDisplayMode) {
      case "blank":
        return null;
      case "page":
        return <Contact content={contactPageContent} />;
      case "thumbs":
        return (
          <Thumbs
            edges={edgesWithFeaturedImage}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            setActiveContentDisplayMode={setActiveContentDisplayMode}
          />
        );
      case "slider":
      default:
        return (
          <Slider
            edges={edgesWithFeaturedImage}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        );
    }
  };

  return (
    <Container className="Content">
      Content
      <Icon onClick={() => contentSwitcherClickHandler()}>
        {contentSwitcherIcon}
      </Icon>
      <ContentContext.Provider value={activeContentDisplayMode}>
        <DisplayContent />
      </ContentContext.Provider>
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps, ContentContext };
