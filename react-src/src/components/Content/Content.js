import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import Posts, { PostsPropTypes, PostsDefaultProps } from "../Posts";
import Pages, { PagesPropTypes, PagesDefaultProps } from "../Pages";
import Slider from "../Slider";
import Thumbs from "../Thumbs";
import Contact from "../Contact";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  ...PostsPropTypes,
  ...PagesPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  ...PagesDefaultProps
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
 * Displays the component
 */
const Content = props => {
  /**
   * Loads a list of posts associated to a category
   */
  const posts = Posts(props);

  /**
   * Loads the Contact page from the database
   */
  const pages = Pages(props);
  const contactPageContent = pages.edges[0].node.content;

  /**
   * Displays a content switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const gridIcon = theme.icons.grid;

  return (
    <Container className="Content">
      Content
      <div>Nr. of Posts: {posts.edges.length}</div>
      <div>Nr. of Pages: {pages.edges.length}</div>
      <ul>
        <Icon>{gridIcon}</Icon>
        <ul>
          <li>Active: when a category is displayed</li>
          <li>Inactive: when the Random slideshow or Contact is displayed</li>
        </ul>
      </ul>
      <Slider />
      <Thumbs />
      <Contact content={contactPageContent} />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps };
