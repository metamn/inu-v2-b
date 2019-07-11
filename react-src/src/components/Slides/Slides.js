import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Slide from "../Slide";
import Post from "../Post";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Raw data to set up slides
   */
  rawData: PropTypes.any,
  /**
   * The active slide
   */
  activeSlide: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  rawData: "Raw data",
  activeSlide: 3
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  position: "relative"
}));

/**
 * Displays the component
 */
const Slides = props => {
  const { rawData, activeSlide } = props;

  /**
   * Prepares an array to hold the refs to each slide
   */
  let refs = [];

  /**
   * Prepares the slides
   */
  const slides = rawData.map((data, index) => {
    const ref = React.createRef();
    refs[index] = ref;

    const isActive = index === activeSlide;

    return (
      <Slide isActive={isActive} key={`slide-${index}`} ref={ref}>
        <Post {...data.node} />
      </Slide>
    );
  });

  /**
   * Renders the slides
   */
  const slidesRendered = <Container className="Slides">{slides}</Container>;

  return [refs, slidesRendered];
};

Slides.propTypes = propTypes;
Slides.defaultProps = defaultProps;

export default Slides;
export { propTypes as SlidesPropTypes, defaultProps as SlidesDefaultProps };
