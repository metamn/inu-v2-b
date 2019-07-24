import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The url of the placeholder image service
   */
  url: PropTypes.string,
  /**
   * The background color
   */
  backgroundColor: PropTypes.string,
  /**
   * The text color
   */
  color: PropTypes.string,
  /**
   * The text (optional)
   */
  text: PropTypes.string,
  /**
   * The image width in pixels
   */
  width: PropTypes.string,
  /**
   * The image height in pixels
   */
  height: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  url: "https://placeholder.pics/svg",
  backgroundColor: "FFFFFF",
  color: "000000",
  text: "image",
  width: "300",
  height: "300"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Creates a placeholder image url with `https://placeholder.pics`
 */
const createPlaceholderImageUrl = props => {
  const { url, backgroundColor, color, text, width, height } = props;

  return `${url}/${width}x${height}/${backgroundColor}/${color}/${text}`;
};

/**
 * Displays a placeholder image
 */
const PlaceholderImage = props => {
  return <Container className="PlaceholderImage">PlaceholderImage</Container>;
};

PlaceholderImage.propTypes = propTypes;
PlaceholderImage.defaultProps = defaultProps;

export default PlaceholderImage;
export {
  propTypes as PlaceholderImagePropTypes,
  defaultProps as PlaceholderImageDefaultProps,
  createPlaceholderImageUrl
};
