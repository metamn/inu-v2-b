import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { stringify } from "flatted";

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
  contentSwitcherIcon: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  contentSwitcherIcon: "Contet switcher icon"
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
  /**
   * Loads a list of posts associated to a category
   */
  const posts = Posts();
  //console.log("posts:" + stringify(posts));

  /**
   * Filters posts having a featured image set
   */
  const postsWithFeaturedImage = posts.edges.filter(
    edge => edge.node.featuredImage
  );

  //console.log("posts wfi:" + stringify(postsWithFeaturedImage));

  /**
   * Loads the Contact page from the database
   */
  const pages = Pages();
  const contactPageContent = pages.edges[0].node.content;

  /**
   * Displays a content switcher icon
   */
  const { contentSwitcherIcon } = props;

  return (
    <Container className="Content">
      Content
      <ul>
        <Icon>{contentSwitcherIcon}</Icon>
        <ul>
          <li>Active: when a category is displayed</li>
          <li>Inactive: when the Random slideshow or Contact is displayed</li>
        </ul>
      </ul>
      <Slider {...posts} />
      <Thumbs {...posts} />
      <Contact content={contactPageContent} />
    </Container>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
export { propTypes, defaultProps };
