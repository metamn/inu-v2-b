import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Slides, { SlidesDefaultProps, SlidesPropTypes } from "../Slides";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Slides
   */
  ...SlidesPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...SlidesDefaultProps
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  position: "relative",
  height: "70vh",
  overflow: "hidden"
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
      {slidesRendered}
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
