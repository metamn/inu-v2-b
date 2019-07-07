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
  thumbs: ["Thumbs"]
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
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
      <ul class="data">
        <li>{thumbs}</li>
      </ul>
    </Container>
  );
};

Thumbs.propTypes = propTypes;
Thumbs.defaultProps = defaultProps;

export default Thumbs;
export { propTypes, defaultProps };
