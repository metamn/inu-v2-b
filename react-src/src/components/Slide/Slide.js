import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  width: "100%",

  "& article": {
    width: "80vw",
    opacity: "0",
    transform: "translateX(100vw)",
    /**
     * On Random this transition effect is not visible since there are many images and the scrollintoview process takes more than 500ms, even more then 1500ms
     */
    transition: "all 500ms"
  },

  "&.active": {
    "& article": {
      opacity: "1",
      transform: "translateX(0px)"
    }
  },

  /**
   * Modern scroll snap points
   */
  "& @supports (scroll-snap-align: start)": {
    scrollSnapAlign: "center"
  },

  /**
   * Old scroll snap points
   */
  "& @supports not (scroll-snap-align: start)": {
    scrollSnapCoordinate: "0 0"
  }
}));

/**
 * Displays the Slide and wraps it into a `ref` container.
 *
 * @see https://reactjs.org/docs/forwarding-refs.html
 */
const Slide = React.forwardRef((props, ref) => {
  const { children, isActive } = props;

  const active = isActive ? "active" : "";

  return (
    <Container className={`Slide ${active}`} ref={ref}>
      {children}
    </Container>
  );
});

Slide.propTypes = propTypes;
Slide.defaultProps = defaultProps;

export default Slide;
export { propTypes as SlidePropTypes, defaultProps as SlideDefaultProps };
