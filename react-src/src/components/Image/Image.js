import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import ProgressiveImage from "react-progressive-image";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The image source
   */
  src: PropTypes.string,
  /**
   * The image title
   */
  alt: PropTypes.string,
  /**
   * The image width
   */
  width: PropTypes.string,
  /**
   * The image height
   */
  height: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  src: "https://placeholder.pics/svg/300/FFFFFF/000000/image",
  alt: "image",
  width: "100%",
  height: "auto"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Displays the component
 */
const Image = props => {
  const { src, alt } = props;

  return (
    <Container className="Image">
      <img src={src} alt={alt} />
    </Container>
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
export { propTypes, defaultProps };
