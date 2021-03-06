import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";
import { ThumbClickContext } from "../Content";

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
   * The image index. Passed to the click handler.
   */
  index: PropTypes.number,
  /**
   * The cursor type.
   */
  cursor: PropTypes.oneOf(["default", "pointer", "custom"])
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
  index: 1,
  cursor: "custom"
};

/**
 * Styles the image
 */
const Img = styled("img")(props => ({
  width: "100%",
  height: "auto",
  maxWidth: props.width ? `${props.width}px` : "100%",
  maxHeight: props.height ? `${props.height}px` : "auto",
  cursor:
    props.cursor === "custom"
      ? props.theme.cursors.brutalistCursor2.cursor
      : props.cursor
}));

/**
 * Displays an image
 */
const Image = props => {
  /**
   * Loads image properties
   */
  const { src, alt, width, height, placeholder, index, cursor } = props;

  /**
   * Creates a placeholder image.
   */
  const placeholderImage = createPlaceholderImageUrl(placeholder);

  /**
   * Displays a placeholder image if the original image is missing
   */
  const nonEmptySrc = src !== null ? src : placeholderImage;

  /**
   * Manages click on image via Context
   *
   * This is a special extension to the component to suit this project.
   */
  const thumbClickHandler = useContext(ThumbClickContext);

  /**
   * Loads theme
   */
  const { theme } = useTheme();

  /**
   * Returns a simple HTML image
   */
  const result = (
    <Img
      className="Image"
      src={nonEmptySrc}
      alt={alt}
      width={width}
      height={height}
      cursor={cursor}
      theme={theme}
      onClick={() =>
        typeof thumbClickHandler === "function"
          ? thumbClickHandler(index)
          : null
      }
    />
  );

  return result;
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
export { propTypes as ImagePropTypes, defaultProps as ImageDefaultProps };
