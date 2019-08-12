import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";

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
  ...props.theme.colorPairs.default,
  display: "flex",
  flexWrap: "wrap",
  opacity: props.isLoading ? "0.3" : "1"
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
   * Loads theme
   */
  const { theme } = useTheme();

  /**
   * Returns the thumbs. The active thumb is marked.
   */
  const thumbs = useMemo(
    () =>
      edges.map((data, index) => {
        const isActive = index === activeImage;

        return (
          <Thumb
            isActive={isActive}
            key={`thumb-${index}`}
            post={data.node}
            index={index}
          />
        );
      }),
    [activeImage, edges]
  );

  /**
   * Checks if the thumbs are still loading
   */
  const isLoading = edges[0].node.id === "1";

  return (
    <Container className="Thumbs" theme={theme} isLoading={isLoading}>
      {thumbs}
    </Container>
  );
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps };
