import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useEventListener } from "../../hooks";

import Slides from "../Slides";
import { PostsPropTypes, PostsDefaultProps } from "../Posts";
import { Section as _Section } from "../SemanticHTML";

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
  setActiveImage: PropTypes.func,
  /**
   * Is the slideshow active?
   */
  isSlideShowActive: PropTypes.bool
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 1,
  setActiveImage: () => {
    console.log("Active image setter");
  },
  isSlideShowActive: false
};

/**
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  overflowX: "hidden",
  height: "calc(100vh - var(--lem) * 10)"
}));

/**
 * Displays the slider
 */
const Slider = props => {
  const { edges, activeImage, setActiveImage, isSlideShowActive } = props;

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
   * Handles the touch scroll event
   */
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

  /**
   * Listens for the touch event
   */
  useEventListener("touchend", touchScrollHandler);

  /**
   * Autoslides the images.
   *
   * Images are randomized during the autoslide.
   */
  useEffect(
    () => {
      let interval = null;

      if (isSlideShowActive) {
        interval = setInterval(() => {
          const slideNumbers = Array.from(Array(numberOfSlides).keys()).filter(
            i => i !== activeImage
          );

          const random =
            slideNumbers[Math.floor(Math.random() * slideNumbers.length)];

          setActiveImage(random);
        }, 2500);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    },
    [activeImage, isSlideShowActive, numberOfSlides, setActiveImage]
  );

  return (
    <Section className="Slider" title="Slider">
      {slidesRendered}
    </Section>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export { propTypes as SliderPropTypes, defaultProps as SliderDefaultProps };
