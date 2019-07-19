import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  PlaceholderImagePropTypes,
  PlaceholderImageDefaultProps,
  createPlaceholderImageUrl
} from "../PlaceholderImage";

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
   * The placeholder
   */
  placeholder: PropTypes.shape(PlaceholderImagePropTypes),
  /**
   * The image click handler
   */
  clickHandler: PropTypes.func,
  /**
   * The image index. Passed to the click handler
   */
  index: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  src: null,
  alt: "image",
  width: null,
  height: null,
  placeholder: PlaceholderImageDefaultProps,
  clickHandler: () => {
    console.log("Image clicked");
  },
  index: 1
};

/**
 * Styles the image
 */
const Img = styled("img")(props => ({
  width: props.width ? props.width : "100%",
  height: props.height ? props.height : "auto"
}));

/**
 * Displays the image
 */
const Image = props => {
  /**
   * Loads image properties
   */
  const { src, alt, width, height, clickHandler, placeholder, index } = props;

  /**
   * Creates a placeholder image.
   */
  const placeholderImage = createPlaceholderImageUrl(placeholder);

  /**
   * Returns a placeholder if the image is missing
   */
  const nonEmptySrc = src !== null ? src : placeholderImage;

  /**
   * Returns a simple HTML image
   */
  return (
    <Img
      className="image"
      src={nonEmptySrc}
      alt={alt}
      width={width}
      height={height}
      onClick={() => clickHandler(index)}
    />
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
export { propTypes as ImagePropTypes, defaultProps as ImageDefaultProps };
