import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Media, useTheme } from "../../hooks";

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
  [`${Media.mobile}`]: {
    height: "calc(100vh - var(--lem) * 10)",
    display: "flex",
    alignItems: "center",
    width: `calc(100vw - ${props.theme.spacing.left.mobile} * 2)`
  },

  [`${Media.tablet}`]: {
    alignItems: "start",
    width: `calc(100vw - ${props.theme.spacing.left.tablet} * 2)`
  },

  [`${Media.laptop}`]: {
    width: `calc(100vw - ${props.theme.spacing.left.laptop} * 2)`
  },

  [`${Media.desktop}`]: {
    width: `calc(100vw - ${props.theme.spacing.left.desktop} * 2)`
  }
}));

const SlideClickContext = React.createContext({});

/**
 * Displays the slider.
 *
 * @see https://developers.google.com/web/updates/2018/07/css-scroll-snap
 */
const Slider = props => {
  const { edges, activeImage, slidesRef } = props;
  const { theme } = useTheme();
  console.log("Slider");

  /**
   * Calculates the number of slides
   */
  const numberOfSlides = edges.length;

  /**
   * Scrolls the slider to the active image
   */
  useEffect(
    () => {
      if (slidesRef && slidesRef.current) {
        const ref = slidesRef.current;
        const slideWidth = ref.clientWidth;
        ref.scrollBy(slideWidth * activeImage, 0);
      }
    },
    [activeImage, slidesRef]
  );

  /**
   * Manages the click on a slide
   *
   * Detecting end of scroll: https://stackoverflow.com/questions/19005348/how-to-check-if-the-scrollbar-has-reached-at-the-end-of-div
   */
  const slideClickHandler = () => {
    const ref = slidesRef.current;
    const slideWidth = ref.clientWidth;
    const sliderPosition = ref.scrollLeft;
    const slideEnd = (numberOfSlides - 1) * slideWidth;

    sliderPosition === slideEnd
      ? ref.scrollTo(0, 0)
      : ref.scrollBy(slideWidth, 0);
  };

  return (
    <SlideClickContext.Provider value={slideClickHandler}>
      <Section className="Slider" title="Slider" theme={theme}>
        <Slides ref={slidesRef} activeImage={activeImage} {...props} />
      </Section>
    </SlideClickContext.Provider>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export {
  propTypes as SliderPropTypes,
  defaultProps as SliderDefaultProps,
  SlideClickContext
};
