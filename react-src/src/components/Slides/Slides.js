import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  width: "100%",

  display: "flex",
  alignItems: "center",

  overflowX: "auto",
  overflowY: "hidden",

  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "-webkit-overflow-scrolling": "touch",

  "&::-webkit-scrollbar": {
    display: "none"
  },

  "& @supports (scroll-snap-align: start)": {
    scrollSnapType: "x mandatory"
  },

  "& @supports not (scroll-snap-align: start)": {
    scrollSnapType: "mandatory",
    scrollSnapDestination: "0% center",
    scrollSnapPointsX: "repeat(100%)"
  }
}));

/**
 * Displays the component
 */
const Slides = props => {
  const { edges, activeImage } = props;

  /**
   * Prepares an array to hold the refs to each slide
   */
  let refs = [];

  /**
   * Prepares the slides
   */
  const slides = edges.map((data, index) => {
    const ref = React.createRef();
    refs[index] = ref;

    const isActive = index === activeImage;

    return (
      <Slide isActive={isActive} key={`slide-${index}`} ref={ref}>
        <Post {...data.node} index={index} />
      </Slide>
    );
  });

  /**
   * Renders the slides
   */
  const slidesRendered = <Container className="Slides">{slides}</Container>;

  return {
    refs: refs,
    slidesRendered: slidesRendered
  };
};

Slides.propTypes = propTypes;
Slides.defaultProps = defaultProps;

export default Slides;
export { propTypes as SlidesPropTypes, defaultProps as SlidesDefaultProps };
