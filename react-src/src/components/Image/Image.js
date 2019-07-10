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
   * A set of image sources
   */
  srcset: PropTypes.string,
  /**
   * A set of source sizes
   */
  sizes: PropTypes.string,
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
  isLoading: PropTypes.bool,
  /**
   * Delay the loading of the image in miliseconds
   */
  delay: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  src: "",
  srcset: "",
  sizes: "",
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
  isLoading: false,
  delay: 0
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
 * Displays an image
 *
 * @see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 * @see https://github.com/FormidableLabs/react-progressive-image
 */
const Image = props => {
  /**
   * Loads image properties
   */
  const {
    src,
    srcset,
    sizes,
    alt,
    width,
    height,
    placeholder,
    isProgressive,
    isLoading,
    delay
  } = props;

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
    <ProgressiveImage
      src={nonEmptySrc}
      srcSetData={{
        srcSet: srcset,
        sizes: sizes
      }}
      placeholder={placeholderImage}
      delay={delay}
    >
      {(src, loading, srcSetData) => (
        <Img
          className="progressive-image"
          src={nonEmptySrc}
          srcSet={srcSetData.srcSet}
          sizes={srcSetData.sizes}
          alt={alt}
          isLoading={loading}
        />
      )}
    </ProgressiveImage>
  ) : (
    <Img
      className="image"
      src={nonEmptySrc}
      srcset={srcset}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      isLoading={isLoading}
    />
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
export { propTypes, defaultProps };
