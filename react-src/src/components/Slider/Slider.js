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
  responsiveImages: PropTypes.array
};

/**
 * Defines the default props
 */
const defaultProps = {
  responsiveImages: ["Responsive images"]
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the slider
 */
const Slider = props => {
  /**
   * Displays a set of responsive images
   */
  const { responsiveImages } = props;

  return (
    <Container className="Slider">
      Slider
      <ul>
        <li>{responsiveImages}</li>
      </ul>
    </Container>
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
export { propTypes, defaultProps };
