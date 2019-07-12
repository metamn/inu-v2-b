import React from "react";
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
   * The active slide
   */
  activeSlide: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeSlide: 1
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  position: "relative",
  height: "90vh",
  overflow: "hidden",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  backgroundColor: "white"
}));

/**
 * Displays the slider
 */
const Slider = props => {
  /**
   * Loads the slides
   */
  const [refs, slidesRendered] = Slides(props);

  return (
    <Container className="Slider">
      Slider
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
      {slidesRendered}
    </Container>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export { propTypes as SliderPropTypes, defaultProps as SliderDefaultProps };
