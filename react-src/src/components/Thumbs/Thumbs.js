import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Thumb from "../Thumb";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Raw data to set up thumbs
   */
  rawData: PropTypes.any,
  /**
   * Which thumb is active
   */
  activeThumb: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  rawData: "rawData",
  activeThumb: 3
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
   * Loads the raw data
   */
  const { rawData, activeThumb } = props;

  /**
   * Prepares the thumbs
   */
  const thumbs = rawData.map((data, index) => {
    const isActive = index === activeThumb;

    return (
      <Thumb isActive={isActive} key={`thumb-${index}`} post={data.node} />
    );
  });

  return (
    <Container className="Thumbs">
      Thumbs
      {thumbs}
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
