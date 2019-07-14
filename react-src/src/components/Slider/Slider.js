import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useEventListener } from "../../hooks";

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
  margin: "1.25em"
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
   * Loads the slides
   */
  const { refs, slidesRendered } = Slides({
    activeImage: activeImage,
    ...props
  });

  /**
   * Scrolls the active slide into the view
   */
  useEffect(
    () => {
      if (refs && refs[activeImage] && refs[activeImage].current) {
        refs[activeImage].current.className += " active";
        refs[activeImage].current.scrollIntoView({
          behavior: "auto",
          block: "start",
          inline: "nearest"
        });
      }
    },
    [activeImage, refs]
  );

  /**
   * Manages the click on a slide
   */
  const slideClickHandler = useCallback(index => {
    // No clicks on `Random`
    //if (category === -1) return;

    if (index + 1 < numberOfSlides) {
      setActiveImage(index + 1);
    } else {
      setActiveImage(0);
    }
  });

  // Touch scroll event handler
  const touchScrollHandler = useCallback(
    () => {
      const visibleRef = refs.findIndex(ref => {
        const left = ref.current.getBoundingClientRect().left;
        const right = ref.current.getBoundingClientRect().right;
        return (
          left >= -window.innerWidth / 2 &&
          left <= window.innerWidth &&
          right > 0 &&
          right <= window.innerWidth * 1.5
        );
      });

      setActiveImage(visibleRef);
    },
    [refs, setActiveImage]
  );

  // The touch event listener hook
  useEventListener("touchend", touchScrollHandler);

  return (
    <Container className="Slider">
      <SliderContext.Provider value={slideClickHandler}>
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
