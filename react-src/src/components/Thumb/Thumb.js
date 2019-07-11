import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Post, { PostPropTypes, PostsDefaultProps } from "../Post";

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
  post: PostsDefaultProps,
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
  const { isActive, post, featuredImageType } = props;

  return (
    <Container className="Thumb">
      <Post {...post} featuredImageType={featuredImageType} />
    </Container>
  );
};

Thumb.propTypes = propTypes;
Thumb.defaultProps = defaultProps;

export default Thumb;
export { propTypes, defaultProps };
