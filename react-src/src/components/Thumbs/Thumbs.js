import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MainContext } from "../Main";
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
   * The active image
   */
  activeImage: PropTypes.number,
  /**
   * The active image setter function
   */
  setActiveImage: PropTypes.func
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...PostsDefaultProps,
  activeImage: 1,
  setActiveImage: () => {
    console.log("Active image setter");
  }
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
 * Creates a context for handling the clicks on the image.
 */
const ThumbsContext = React.createContext({});

/**
 * Displays a set of thumbnails
 */
const Thumbs = props => {
  /**
   * Loads the posts
   */
  const { edges, activeImage, setActiveImage } = props;

  const { setActiveContentDisplayMode } = useContext(MainContext);

  /**
   * Manages the click on a thumb.
   *
   * Marks the active image.
   * Changes the display mode to `slider`
   */
  const thumbClickHandler = index => {
    setActiveImage(index);
    setActiveContentDisplayMode("slider");
  };

  /**
   * Prepares the thumbs
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

  return (
    <Container className="Thumbs">
      <ThumbsContext.Provider value={thumbClickHandler}>
        {thumbs}
      </ThumbsContext.Provider>
    </Container>
  );
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps, ThumbsContext };
