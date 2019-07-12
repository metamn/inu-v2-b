import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Slides from "../Slides";
import { PostsPropTypes, PostsDefaultProps } from "../Posts";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Slides
   */
  ...PostsPropTypes,
  /**
   * The active image
   */
  activeImage: PropTypes.number,
  /**
   * The active image setter function
   */
  setActiveImage: PropTypes.func
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 1,
  setActiveImage: () => {
    console.log("Active image setter");
  }
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  width: "80vw",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  backgroundColor: "white"
}));

/**
 * Creates a context for handling the clicks on the image.
 *
 * Clicks must be handled on the lowest level (... to my current knowledge)
 */
const SliderContext = React.createContext({});

/**
 * Displays the slider
 */
const Slider = props => {
  const { edges, activeImage, setActiveImage } = props;

  /**
   * Counts the slides
   */
  const numberOfSlides = edges.length;

  /**
   * Manages the click on a slide
   */
  const slideClickHandler = useCallback(index => {
    // No clicks on `Random`
    //if (category === -1) return;

    console.log("index:" + index);

    if (index + 1 < numberOfSlides) {
      setActiveImage(index + 1);
    } else {
      setActiveImage(0);
    }
  });

  /**
   * Loads the slides
   */
  const { refs, slidesRendered } = Slides({
    activeSlide: activeImage,
    ...props
  });

  return (
    <Container className="Slider">
      <SliderContext.Provider value={slideClickHandler}>
        {" "}
        {slidesRendered}
      </SliderContext.Provider>
    </Container>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export {
  propTypes as SliderPropTypes,
  defaultProps as SliderDefaultProps,
  SliderContext
};
