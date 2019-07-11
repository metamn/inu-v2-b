import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Slide, { SlideDefaultProps, SlidePropTypes } from "../Slide";
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
   * Which slide is active
   */
  activeSlide: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  rawData: "rawData",
  activeSlide: 3
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Styles the slides container
 */
const Slides = styled("div")(props => ({}));

/**
 * Displays the slider
 */
const Slider = props => {
  /**
   * Loads the raw data
   */
  const { rawData, activeSlide } = props;

  /**
   * Prepares an array to hold the slide refs
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

  return (
    <Container className="Slider">
      Slider
      <Slides className="Slides">{slides}</Slides>
      <ul>
        <li>
          On click
          <ul>
            <li>When a category is displayed</li>
            <li>Slides to next image</li>
          </ul>
        </li>
        <li>
          Autoslide
          <ul>
            <li>When the random slideshow is displayed</li>
            <li>Slides automatically to next image</li>
            <li>When there are no more images loads more from the database</li>
          </ul>
        </li>
      </ul>
    </Container>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export { propTypes, defaultProps };
