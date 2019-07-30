import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

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
  isSlideShowActive: PropTypes.bool,
  /**
   * The reference to slides.
   *
   * @see https://stackoverflow.com/questions/48007326/what-is-the-correct-proptype-for-a-ref-in-react#51127130
   */
  slidesRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Slides) })
  ]),
  /**
   * The active menu item
   */
  activeMenuItem: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 0,
  setActiveImage: () => {
    console.log("Active image setter");
  },
  isSlideShowActive: false,
  slidesRef: null,
  activeMenuItem: "0"
};

/**
 * Styles the component container
 */
const Section = styled(_Section)(props => ({
  ...props.theme.colorPairs.default,
  visibility: props.isFisrtsCategoryLoaded ? "visible" : "hidden",

  [`${Media.mobile}`]: {
    width: `calc(100vw - ${props.theme.spacing.left.mobile} * 2 + var(--lem))`
  },

  [`${Media.tablet}`]: {
    alignItems: "start",
    width: `calc(100vw - ${props.theme.spacing.left.tablet} * 2  + var(--lem))`
  },

  [`${Media.laptop}`]: {
    width: `calc(100vw - ${props.theme.spacing.left.laptop} * 2  + var(--lem))`
  },

  [`${Media.desktop}`]: {
    width: `calc(100vw - ${props.theme.spacing.left.desktop} * 2  + var(--lem))`
  }
}));

/**
 * The animated slider container.
 *
 * Useful for the thumb-to-slider transition.
 * For categories with lots of images 0.5s might be not enough;
 * For categories with less images 0.5s is good enough.
 * This can be later enhanced to be dynamic.
 *
 * `keyframes` needs to be used with `css`
 */
const SliderAnimated = styled(Section)(
  props => css`
    animation: ${props.theme.animations.fadeInSlider};
    animation-duration: 0.5s;
  `
);

/**
 * The animated slideshow container.
 *
 * `keyframes` needs to be used with `css`
 */
const SlideshowAnimated = styled(Section)(
  props => css`
    animation: ${props.theme.animations.fadeInSlideshow};
    animation-duration: 10s;
    animation-iteration-count: infinite;
  `
);

/**
 * Creates a context to pass the click on slide.
 */
const SliderContext = React.createContext({});

/**
 * Displays the slider.
 *
 * @see https://developers.google.com/web/updates/2018/07/css-scroll-snap
 */
const Slider = props => {
  const {
    edges,
    activeImage,
    slidesRef,
    isSlideShowActive,
    activeMenuItem
  } = props;

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

        ref.scrollBy({
          left: slideWidth * activeImage,
          top: 0,
          behavior: "smooth"
        });
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
    if (isSlideShowActive) return;

    const ref = slidesRef.current;
    const slideWidth = ref.clientWidth;
    const sliderPosition = ref.scrollLeft;
    const slideEnd = (numberOfSlides - 1) * slideWidth;

    sliderPosition === slideEnd
      ? ref.scrollTo({ left: 0, top: 0, behavior: "smooth" })
      : ref.scrollBy({
          left: slideWidth,
          top: 0,
          behavior: "smooth"
        });
  };

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

          const ref = slidesRef.current;
          const slideWidth = ref.clientWidth;

          ref.scrollTo({
            left: slideWidth * random,
            top: 0,
            behavior: "smooth"
          });
        }, 10000);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    },
    [activeImage, isSlideShowActive, numberOfSlides, slidesRef]
  );

  /**
   * Checks if the first category is loaded.
   *
   * If not, the slider will be hidden to avoid flicking
   */
  const isFisrtsCategoryLoaded = activeMenuItem !== "0";

  return (
    <SliderContext.Provider
      value={{
        slideClickHandler: slideClickHandler,
        isSlideShowActive: isSlideShowActive
      }}
    >
      {isSlideShowActive ? (
        <SlideshowAnimated className="Slider" title="Slider" theme={theme}>
          <Slides ref={slidesRef} activeImage={activeImage} {...props} />
        </SlideshowAnimated>
      ) : (
        <SliderAnimated
          className="Slider"
          title="Slider"
          theme={theme}
          isFisrtsCategoryLoaded={isFisrtsCategoryLoaded}
        >
          <Slides ref={slidesRef} activeImage={activeImage} {...props} />
        </SliderAnimated>
      )}
    </SliderContext.Provider>
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
