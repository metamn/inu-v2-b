import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useEventListener, Media, useTheme } from "../../hooks";

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

/**
 * Displays the slider.
 *
 * @see https://developers.google.com/web/updates/2018/07/css-scroll-snap
 */
const Slider = props => {
  const { edges, activeImage, setActiveImage, isSlideShowActive } = props;

  const { theme } = useTheme();

  /**
   * Loads the slides
   */
  const { refs, slidesRendered } = Slides({
    activeImage: activeImage,
    ...props
  });

  return (
    <Section className="Slider" title="Slider" theme={theme}>
      {slidesRendered}
    </Section>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export { propTypes as SliderPropTypes, defaultProps as SliderDefaultProps };
