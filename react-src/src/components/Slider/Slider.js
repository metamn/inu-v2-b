import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * A set of responsive images
   */
  images: PropTypes.array
};

/**
 * Defines the default props
 */
const defaultProps = {
  images: ["Displays the featured image in a responsive way"]
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  backgroundColor: "white"
}));

/**
 * Styles the slides container
 */
const Slides = styled("div")(props => ({}));

/**
 * Styles the slide container
 */
const Slide = styled("div")(props => ({}));

/**
 * Displays the slider
 */
const Slider = props => {
  /**
   * Displays a set of responsive images
   */
  const { images } = props;

  /**
   * Prepares the slides
   */
  const slides = images.map((image, index) => {
    const ref = React.createRef();
    //refs[index] = ref;

    return (
      <Slide key={`slide-${index}`} ref={ref}>
        Slide
      </Slide>
    );
  });

  return (
    <Container className="Slider">
      Slider
      <Slides>{slides}</Slides>
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
