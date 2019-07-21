import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import Posts from "../Posts";
import Pages, { PagesPropTypes, PagesDefaultProps } from "../Pages";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";
import _Icon from "../Icon";
import { Section as _Section } from "../SemanticHTML";

/**
 * Defines the content display modes
 *
 * `blank` - When the menu is visible
 * `slider` - When a category or Random slideshow is displayed
 * `thumbs` - When a category is displayd`
 * `page` - When the Contact page is displayed
 */
const ContentDisplayModes = ["blank", "slider", "thumbs", "page"];

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The active menu item
   */
  activeMenuItem: PropTypes.string,
  /**
   * The active display mode
   */
  activeContentDisplayMode: PropTypes.oneOf(ContentDisplayModes),
  /**
   * Sets the active display mode
   */
  setActiveContentDisplayMode: PropTypes.func,
  /**
   * The default content switcher icon
   */
  defaultContentSwitcherIcon: PropTypes.string,
  /**
   * The content switcher click handler
   */
  contentSwitcherClickHandler: PropTypes.func,
  /**
   * The default active image (slide and thumb)
   */
  defaultImage: PropTypes.number,
  /**
   * The default page query
   */
  defaultPageQuery: PagesPropTypes.variables
};

/**
 * Defines the default props
 */
const defaultProps = {
  activeMenuItem: "1",
  activeContentDisplayMode: "slider",
  setActiveContentDisplayMode: () => {
    console.log("Set active display mode");
  },
  defaultContentSwitcherIcon: "Contet switcher icon",
  contentSwitcherClickHandler: () => {
    console.log("Contet switcher clicked");
  },
  defaultImage: 1,
  defaultPageQuery: PagesDefaultProps.variables
};

/**
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  minHeight: "calc(100vh - var(--lem)*10)",

  "& .Slider": {
    width: "100%"
  }
}));

/**
 * Styles the icon
 */
const Icon = styled(_Icon)(props => ({}));

/**
 * Creates a context for the thumb click.
 */
const ThumbClickContext = React.createContext({});

/**
 * Creates a context for the click on slide.
 */
const SlideClickContext = React.createContext({});

/**
 * Displays various content types
 */
const Content = props => {
  const {
    activeMenuItem,
    activeContentDisplayMode,
    setActiveContentDisplayMode,
    defaultContentSwitcherIcon,
    defaultImage,
    contentSwitcherClickHandler,
    defaultPageQuery
  } = props;

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const contentSwitcherIcon = icons.grid
    ? icons.grid
    : defaultContentSwitcherIcon;

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
   * Removes the content switcher click handler when the content switcher icon is inactive
   */
  const newContentSwitcherClickHandler =
    iconStatus === "active" ? contentSwitcherClickHandler : () => {};

  /**
   * Sets up state to mark the active image (thumb, or slide)
   */
  const [activeImage, setActiveImage] = useState(defaultImage);

  /**
   * Loads a list of posts associated to a category
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

  /**
   * Loads the Contact page from the database
   */
  const pages = Pages({ variables: defaultPageQuery });
  const contactPageContent = pages.edges[0].node.content;

  /**
   * Manages the click on a thumb.
   */
  const thumbClickHandler = index => {
    setActiveImage(index);
    setActiveContentDisplayMode("slider");
  };

  /**
   * Manages the click on a slide.
   */
  const slideClickHandler = index => {
    // No clicks on `Random slideshow`
    if (isSlideShowActive) return;

    if (index + 1 < edgesWithFeaturedImage.length) {
      setActiveImage(index + 1);
    } else {
      setActiveImage(0);
    }
  };

  /**
   * Decides which content to be displayed.
   */
  const DisplayContent = () => {
    switch (activeContentDisplayMode) {
      case "blank":
        return null;
      case "page":
        return <Contact content={contactPageContent} />;
      case "thumbs":
        return (
          <ThumbClickContext.Provider value={thumbClickHandler}>
            <Thumbs edges={edgesWithFeaturedImage} activeImage={activeImage} />
          </ThumbClickContext.Provider>
        );
      case "slider":
      default:
        return (
          <SlideClickContext.Provider value={slideClickHandler}>
            <Slider
              edges={edgesWithFeaturedImage}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              isSlideShowActive={isSlideShowActive}
            />
          </SlideClickContext.Provider>
        );
    }
  };

  return (
    <>
      <Icon
        className="ContentSwitcherIcon"
        status={iconStatus}
        onClick={() => newContentSwitcherClickHandler()}
      >
        {contentSwitcherIcon}
      </Icon>
      <DisplayContent />
    </>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export {
  propTypes as ContentPropTypes,
  defaultProps as ContentDefaultProps,
  ThumbClickContext,
  SlideClickContext,
  ContentDisplayModes
};
