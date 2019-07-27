import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The class name
   */
  className: PropTypes.string,
  /**
   * The click handler
   */
  clickHandler: PropTypes.func,
  /**
   * The size multiplier.
   * The width and height of the icon will be `line-height * size`.
   */
  sizeMultiplier: PropTypes.number,
  /**
   * The icon status
   */
  status: PropTypes.oneOf(["active", "inactive", "hidden", "invisible"]),
  /**
   * The icon itself. Preferably in SVG format.
   */
  children: PropTypes.any.isRequired
};

/**
 * Defines the default props
 */
const defaultProps = {
  className: "Icon",
  clickHandler: () => {
    console.log("Icon clicked");
  },
  sizeMultiplier: 1.5,
  status: "active",
  children: "Icon"
};

/**
 * Styles the icon container
 */
const Container = styled("div")(props => ({
  width: `calc(var(--lem) * ${props.sizeMultiplier})`,
  height: `calc(var(--lem) * ${props.sizeMultiplier})`,

  cursor:
    props.status === "active"
      ? props.theme.cursors.brutalistCursor2.url
      : "default",
  display: props.status === "hidden" ? "none" : "flex",
  visibility: props.status === "invisible" ? "hidden" : "visible",

  color:
    props.status === "active"
      ? props.theme.colors.text
      : props.theme.colors.inactive,

  svg: {
    fontSize: `calc(var(--lem) * ${props.sizeMultiplier})`,
    color:
      props.status === "active"
        ? props.theme.colors.text
        : props.theme.colors.inactive
  }
}));

/**
 * Displays an icon
 */
const Icon = props => {
  const { className, clickHandler, sizeMultiplier, status, children } = props;
  const { theme } = useTheme();

  return (
    <Container
      className={className}
      sizeMultiplier={sizeMultiplier}
      status={status}
      theme={theme}
      onClick={() => clickHandler()}
    >
      {children}
    </Container>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
export { propTypes as IconPropTypes, defaultProps as IconDefaultProps };
