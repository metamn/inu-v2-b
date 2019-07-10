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
   * A set of slides
   */
  slides: PropTypes.array
};

/**
 * Defines the default props
 */
const defaultProps = {
  slides: ["Displays the featured image in a responsive way"]
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
   * Loads the slides
   */
  const { slides } = props;

  /**
   * Prepares an array to hold the slide refs
   */
  let refs = [];

  /**
   * Prepares the slides
   */
  const slidesPrepared = slides.map((slide, index) => {
    const ref = React.createRef();
    refs[index] = ref;

    return (
      <Slide key={`slide-${index}`} ref={ref}>
        <Post />
      </Slide>
    );
  });

  return (
    <Container className="Slider">
      Slider
      <Slides>{slidesPrepared}</Slides>
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
