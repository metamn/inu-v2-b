import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The size multiplier.
   * The width and height of the icon will be `line-height * size`.
   */
  size: PropTypes.number,
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
  size: 1.5,
  status: "active",
  children: "Icon"
};

/**
 * Styles the icon container
 */
const Container = styled("div")(props => ({
  width: `calc(var(--lem) * ${props.size})`,
  height: `calc(var(--lem) * ${props.size})`,

  cursor: props.status === "active" ? "pointer" : "default",
  display: props.status === "hidden" ? "none" : "flex",
  visibility: props.status === "invisible" ? "hidden" : "visible",

  color:
    props.status === "active"
      ? props.theme.colorPairs.default
      : props.theme.colorPairs.inactive,

  svg: {
    fontSize: `calc(var(--lem) * ${props.size})`,
    color:
      props.status === "active"
        ? props.theme.colorPairs.default
        : props.theme.colorPairs.inactive
  }
}));

/**
 * Displays an icon
 */
const Icon = props => {
  const { children } = props;
  const { theme } = useTheme();

  return (
    <Container className="icon" theme={theme} {...props}>
      {children}
    </Container>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
export { propTypes as IconPropTypes, defaultProps as IconDefaultProps };
