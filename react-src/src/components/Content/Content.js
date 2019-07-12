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
   * The types of content displayed
   */
  contentDisplayType: PropTypes.oneOf(["blank", "slider", "thumbs", "content"])
};

/**
 * Defines the default props
 */
const defaultProps = {
  contentSwitcherIcon: "Contet switcher icon",
  contentDisplayType: "slider"
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
 * Displays the component
 */
const Content = props => {
  const { contentDisplayType } = props;

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const contentSwitcherIcon = icons.grid;

  /**
   * Sets up state for the content switcher icon
   */
  const [contentDisplayed, setContentDisplayed] = useState(contentDisplayType);

  /**
   * Manages the click on the menu switcher icon
   */
  const contentSwitcherClickHandler = () => {
    const newDisplay = contentDisplayed === "slider" ? "thumbs" : "slider";
    setContentDisplayed(newDisplay);
  };

  /**
   * Loads a list of posts associated to a category
   */
  const posts = Posts();

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
    switch (contentDisplayed) {
      case "blank":
        return null;
      case "content":
        return <Contact content={contactPageContent} />;
      case "thumbs":
        return <Thumbs edges={edgesWithFeaturedImage} />;
      case "slider":
      default:
        return <Slider edges={edgesWithFeaturedImage} />;
    }
  };

  return (
    <Container className="Content">
      Content
      <ul>
        <Icon onClick={() => contentSwitcherClickHandler()}>
          {contentSwitcherIcon}
        </Icon>
        <ul>
          <li>Active: when a category is displayed</li>
          <li>Inactive: when the Random slideshow or Contact is displayed</li>
        </ul>
      </ul>
      <DisplayContent />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps };
