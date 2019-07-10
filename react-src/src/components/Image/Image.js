import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressiveImage from "react-progressive-image";

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
  },
  /**
   * To use ProgressiveImage?
   */
  isProgressive: PropTypes.bool,
  /**
   * Is it still loading?
   */
  isLoading: PropTypes.bool
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
  },
  isProgressive: false,
  isLoading: false
};

/**
 * Styles the image
 */
const Img = styled("img")(props => ({
  opacity: props.isLoading ? "0.5" : "1"
}));

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
  const { src, alt, width, height, placeholder, isProgressive } = props;

  /**
   * Creates a placeholder image.
   */
  const placeholderImage = createPlaceholderImage(placeholder);

  /**
   * Returns a placeholder if the image is missing
   */
  const nonEmptySrc = src !== "" ? src : placeholderImage;

  /**
   * Returns a ProgressiveImage if requested
   */
  return isProgressive ? (
    <ProgressiveImage src={nonEmptySrc} placeholder={placeholderImage}>
      {(src, loading) => (
        <Img
          className="progressive-image"
          src={nonEmptySrc}
          alt={alt}
          isLoading={loading}
        />
      )}
    </ProgressiveImage>
  ) : (
    <Img
      className="image"
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
