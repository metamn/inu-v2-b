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
   * Which thumb is active
   */
  activeThumb: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeThumb: 1
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  backgroundColor: "white",
  display: "flex",
  flexWrap: "wrap"
}));

/**
 * Displays a set of thumbnails
 */
const Thumbs = props => {
  /**
   * Loads the posts
   */
  const { edges, activeThumb } = props;

  /**
   * Prepares the thumbs
   */
  const thumbs = edges.map((data, index) => {
    const isActive = index === activeThumb;

    return (
      <Thumb isActive={isActive} key={`thumb-${index}`} post={data.node} />
    );
  });

  return <Container className="Thumbs">{thumbs}</Container>;
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps };
