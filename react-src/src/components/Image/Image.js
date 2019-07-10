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
   * The image width in px
   */
  width: PropTypes.string,
  /**
   * The image height in px
   */
  height: PropTypes.string,
  /**
   * The image placeholder
   */
  placeholder: {
    url: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  }
};

/**
 * Defines the default props
 */
const defaultProps = {
  src: "",
  alt: "image",
  width: "",
  height: "",
  placeholder: {
    url: "https://placeholder.pics/svg",
    backgroundColor: "FFFFFF",
    color: "000000",
    text: "image",
    width: "300",
    height: "300"
  }
};

/**
 * Styles the image
 */
const Img = styled("img")(props => ({}));

/**
 * Creates a placeholder image with `https://placeholder.pics`
 */
const createPlaceholderImage = props => {
  const { url, backgroundColor, color, text, width, height } = props;

  return `${url}/${width}x${height}/${backgroundColor}/${color}/${text}`;
};

/**
 * Displays the component
 */
const Image = props => {
  /**
   * Loads image properties
   */
  const { src, alt, width, height, placeholder } = props;

  /**
   * Returns a placeholder if the image is missing
   */
  const nonEmptySrc = src !== "" ? src : createPlaceholderImage(placeholder);

  return (
    <Img
      className="Image"
      src={nonEmptySrc}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
export { propTypes, defaultProps };
