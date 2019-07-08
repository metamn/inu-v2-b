import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * A set of thumbnails
   */
  thumbs: PropTypes.array
};

/**
 * Defines the default props
 */
const defaultProps = {
  thumbs: ["Displays the thumbnail version of the featured images"]
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em",
  backgroundColor: "white"
}));

/**
 * Displays the component
 */
const Thumbs = props => {
  /**
   * Displays a set of thumbnails
   */
  const { thumbs } = props;

  return (
    <Container className="Thumbs">
      Thumbs
      <ul>
        <li>{thumbs}</li>
        <li>Marks the active image</li>
      </ul>
      <ul>
        <li>
          On click
          <ul>
            <li>
              When an image is clicked returns to Slider mode with the clicked
              image displayed in the Slider
            </li>
          </ul>
        </li>
      </ul>
    </Container>
  );
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps };
