import React, { useState } from "react";
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
   * The active image (slide or thumb)
   */
  currentImage: PropTypes.number,
  /**
   * The active display mode
   */
  activeContentDisplayMode: PropTypes.oneOf([
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
  contentSwitcherIcon: "Contet switcher icon",
  contentDisplayMode: "slider",
  currentImage: 1,
  activeMenuItem: 1,
  activeContentDisplayMode: "slider"
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
 * Displays various content types
 */
const Content = props => {
  const {
    activeContentDisplayMode,
    setActiveContentDisplayMode,
    currentImage,
    activeMenuItem,
    contentSwitcherClickHandler
  } = props;

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const contentSwitcherIcon = icons.grid;

  /**
   * Decides if there is a slideshow
   */
  const isSlideShowActive = activeMenuItem === "-1";

  /**
   * Sets the status of the content switcher icon
   *
   * Active - when a category is displayed
   * Hidden - When there is a Slideshow
   * Inactive - Otherwise ...
   */
  const iconStatus = isSlideShowActive
    ? "hidden"
    : activeContentDisplayMode === "slider"
    ? "active"
    : "inactive";

  /**
   * Removes the click handler when the content switcher icon is inactive
   */
  const clickHandler =
    iconStatus === "active" ? contentSwitcherClickHandler : () => {};

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
            isSlideShowActive={isSlideShowActive}
          />
        );
    }
  };

  return (
    <Container className="Content">
      Content
      <Icon status={iconStatus} onClick={() => clickHandler()}>
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
