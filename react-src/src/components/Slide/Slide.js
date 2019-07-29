import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Media, useTheme } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * If the slide is active
   */
  isActive: PropTypes.bool,
  /**
   * The content of the slide
   */
  children: PropTypes.any
};

/**
 * Defines the default props
 */
const defaultProps = {
  isActive: true,
  children: "Slide content"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  scrollSnapAlign: "center",

  [`${Media.mobile}`]: {
    minWidth: `calc(100vw - ${props.theme.spacing.left.mobile} * 2)`
  },

  [`${Media.tablet}`]: {
    minWidth: `calc(100vw - ${props.theme.spacing.left.tablet} * 2)`
  },

  [`${Media.laptop}`]: {
    minWidth: `calc(100vw - ${props.theme.spacing.left.laptop} * 2)`
  },

  [`${Media.desktop}`]: {
    minWidth: `calc(100vw - ${props.theme.spacing.left.desktop} * 2)`
  },

  "& + .Slide": {
    marginLeft: "calc(var(--lem) * 2)"
  }
}));

/**
 * Displays the Slide and wraps it into a `ref` container.
 *
 * @see https://reactjs.org/docs/forwarding-refs.html
 */
const Slide = props => {
  const { children, isActive } = props;
  const { theme } = useTheme();

  const active = isActive ? "active" : "";

  return (
    <Container className={`Slide ${active}`} theme={theme}>
      {children}
    </Container>
  );
};

Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
export { propTypes as SlidePropTypes, defaultProps as SlideDefaultProps };
