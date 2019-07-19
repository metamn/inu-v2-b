import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import Posts from "../Posts";
import Pages, { PagesPropTypes, PagesDefaultProps } from "../Pages";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";
import Icon from "../Icon";

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
  activeContentDisplayMode: PropTypes.oneOf([
    "blank",
    "slider",
    "thumbs",
    "page"
  ]),
  /**
   * Sets the active display mode`
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
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  position: "relative"
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
   * Removes the click handler when the content switcher icon is inactive
   */
  const clickHandler =
    iconStatus === "active" ? contentSwitcherClickHandler : () => {};

  /**
   * Sets up state to mark the active image (thumb, or slide)
   */
  const [activeImage, setActiveImage] = useState(defaultImage);

  /**
   * Manages the click on a thumb.
   */
  const thumbClickHandler = index => {
    setActiveImage(index);
    console.log("thumb clicked: " + index);
    setActiveContentDisplayMode("slider");
  };

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
  const pages = Pages({ variables: defaultPageQuery });
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
          <ThumbClickContext.Provider value={thumbClickHandler}>
            <Thumbs
              edges={edgesWithFeaturedImage}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />
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
            clickHandler={() => console.log("slider!")}
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
      <DisplayContent />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps, ThumbClickContext };
