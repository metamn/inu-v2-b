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
   * The index of the thumb
   */
  index: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  post: PostDefaultProps,
  isActive: false,
  index: 1
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
 * Displays post as a thumb.
 */
const Thumb = props => {
  const { post, isActive, index } = props;

  return (
    <Container className="Thumb" isActive={isActive}>
      <Post {...post} featuredImageType="thumbnail" index={index} />
    </Container>
  );
};

Thumb.propTypes = propTypes;
Thumb.defaultProps = defaultProps;

export default Thumb;
export { propTypes as ThumbPropTypes, defaultProps as ThumbDefaultProps };
