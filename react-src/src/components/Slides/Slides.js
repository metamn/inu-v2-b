import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Media } from "../../hooks";

import Slide from "../Slide";
import Post from "../Post";
import { PostsPropTypes, PostsDefaultProps } from "../Posts";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The post data to set up slides
   */
  ...PostsPropTypes,
  /**
   * The active image
   */
  activeImage: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 1
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  /* snap mandatory on horizontal axis  */
  scrollSnapType: "x mandatory",

  overflowX: "scroll",
  overflowY: "hidden",

  display: "flex",
  alignItems: "center",

  /* Enable Safari touch scrolling physics which is needed for scroll snap */
  "-webkit-overflow-scrolling": "touch"
}));

/**
 * Displays the component
 */
const Slides = React.forwardRef((props, ref) => {
  const { edges, activeImage } = props;

  /**
   * Prepares the slides
   */
  const slides = edges.map((data, index) => {
    const isActive = index === activeImage;

    return (
      <Slide isActive={isActive} key={`slide-${index}`}>
        <Post {...data.node} index={index} />
      </Slide>
    );
  });

  return (
    <Container className="Slides" ref={ref}>
      {slides}
    </Container>
  );
});

Slides.propTypes = propTypes;
Slides.defaultProps = defaultProps;

export default Slides;
export { propTypes as SlidesPropTypes, defaultProps as SlidesDefaultProps };
