import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme, Media } from "./../../hooks";

import { PostPropTypes, PostDefaultProps } from "../Post";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";
import _Icon from "../Icon";

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
   * The active image
   */
  activeImage: PropTypes.number,
  /**
   * The active image setter
   */
  setActiveImage: PropTypes.func,
  /**
   * The featured images.
   *
   * For some reasons the PostsPropTypes.edges cannot be used here ..
   */
  edgesWithFeaturedImage: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape(PostPropTypes) })
  ),
  /**
   * The contact page content
   */
  contactPageContent: PropTypes.string,
  /**
   * The default content switcher icon
   */
  defaultContentSwitcherIcon: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  activeMenuItem: "0",
  activeContentDisplayMode: "slider",
  setActiveContentDisplayMode: () => {
    console.log("Set active display mode");
  },
  activeImage: 0,
  setActiveImage: () => {
    console.log("Set active image");
  },
  edgesWithFeaturedImage: Array(1).fill({ node: PostDefaultProps }),
  contactPageContent: "Contact page content",
  defaultContentSwitcherIcon: "Contet switcher icon"
};

/**
 * Styles the icon
 */
const Icon = styled(_Icon)(props => ({
  [`${Media.mobile}`]: {
    marginTop: "calc(var(--lem) / 1)"
  },

  [`${Media.tablet}`]: {
    marginTop: "calc(var(--lem) * 2)",
    marginLeft: "calc(var(--lem) / 1)"
  }
}));

/**
 * Creates a context for the thumb click.
 */
const ThumbClickContext = React.createContext({});

/**
 * Displays various content types
 */
const Content = props => {
  const {
    activeMenuItem,
    activeContentDisplayMode,
    setActiveContentDisplayMode,
    activeImage,
    setActiveImage,
    edgesWithFeaturedImage,
    contactPageContent,
    defaultContentSwitcherIcon
  } = props;

  /**
   * Decides if there is a slideshow
   */
  const isSlideShowActive = activeMenuItem === "-1";

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const contentSwitcherIcon = icons.grid
    ? icons.grid
    : defaultContentSwitcherIcon;

  /**
   * Sets the status of the content switcher icon
   *
   * Active - when a category is displayed
   * Hidden - When there is a Slideshow
   * Inactive - Otherwise ...
   */
  const iconStatus = isSlideShowActive
    ? "inactive"
    : activeContentDisplayMode === "slider"
    ? "active"
    : "inactive";

  /**
   * Creates a `ref` to the slides.
   *
   * It will be used to calculate the active image by the content switcher
   */
  const slidesRef = React.createRef();

  /**
   * Manages the click on the content switcher icon
   */
  const contentSwitcherClickHandler = () => {
    /**
     * Sets the new display mode
     */
    const newDisplay =
      activeContentDisplayMode === "slider" ? "thumbs" : "slider";
    setActiveContentDisplayMode(newDisplay);

    /**
     * Calculates the active image for thumbs
     */
    if (newDisplay === "thumbs") {
      const ref = slidesRef.current;
      const slideWidth = ref.clientWidth;
      const sliderPosition = ref.scrollLeft;

      setActiveImage(sliderPosition / slideWidth);
    }
  };

  /**
   * Removes the content switcher click handler when the content switcher icon is inactive
   */
  const newContentSwitcherClickHandler =
    iconStatus === "active" ? contentSwitcherClickHandler : () => {};

  /**
   * Manages the click on a thumb.
   */
  const thumbClickHandler = index => {
    setActiveImage(index);
    setActiveContentDisplayMode("slider");
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
          <Slider
            edges={edgesWithFeaturedImage}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            isSlideShowActive={isSlideShowActive}
            slidesRef={slidesRef}
            activeMenuItem={activeMenuItem}
          />
        );
    }
  };

  return (
    <>
      <Icon
        className="ContentSwitcherIcon"
        status={iconStatus}
        sizeMultiplier={1}
        clickHandler={newContentSwitcherClickHandler}
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
  ContentDisplayModes
};
