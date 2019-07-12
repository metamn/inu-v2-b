import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Post, { PostPropTypes, PostDefaultProps } from "../Post";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The post data
   */
  post: PropTypes.shape(PostPropTypes),
  /**
   * Is the thumb active?
   */
  isActive: PropTypes.bool,
  /**
   * The thumb image type / size
   */
  featuredImageType: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  post: PostDefaultProps,
  isActive: false,
  featuredImageType: "thumbnail"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: props.isActive ? "1px solid" : "1px transparent",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Thumb = props => {
  const { isActive, post, featuredImageType, index } = props;

  return (
    <Container className="Thumb" isActive={isActive}>
      <Post {...post} featuredImageType={featuredImageType} index={index} />
    </Container>
  );
};

Thumb.propTypes = propTypes;
Thumb.defaultProps = defaultProps;

export default Thumb;
export { propTypes as ThumbPropTypes, defaultProps as ThumbDefaultProps };
