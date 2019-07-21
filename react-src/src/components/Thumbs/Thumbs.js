import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Thumb from "../Thumb";
import { PostsPropTypes, PostsDefaultProps } from "../Posts";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Posts
   */
  ...PostsPropTypes,
  /**
   * The active image (thumb)
   */
  activeImage: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 1
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  flexWrap: "wrap"
}));

/**
 * Displays a set of posts as thumbnails.
 */
const Thumbs = props => {
  /**
   * Loads the props
   */
  const { edges, activeImage } = props;

  /**
   * Returns the thumbs. The active thumb is marked.
   */
  const thumbs = edges.map((data, index) => {
    const isActive = index === activeImage;

    return (
      <Thumb
        isActive={isActive}
        key={`thumb-${index}`}
        post={data.node}
        index={index}
      />
    );
  });

  return <Container className="Thumbs">{thumbs}</Container>;
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps };
