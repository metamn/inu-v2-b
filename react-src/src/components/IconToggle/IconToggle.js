import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The first, active by default icon
   */
  icon1: PropTypes.node.isRequired,
  /**
   * The second, inactive by default icon
   */
  icon2: PropTypes.node.isRequired,
  /**
   * The component status
   */
  status: PropTypes.oneOf(["active", "inactive", "hidden", "invisible"]),
  /**
   * The initial icon toggle status
   */
  toggled: PropTypes.bool
};

/**
 * Defines the default props
 */
const defaultProps = {
  icon1: "icon1",
  icon2: "icon2",
  status: "active",
  toggled: false
};

/**
 * Styles the IconToggle container
 */
const Container = styled("div")(props => ({
  cursor: props.status === "active" ? "pointer" : "default",
  display: props.status === "hidden" ? "none" : "flex",
  visibility: props.status === "invisible" ? "hidden" : "visible"
}));

/**
 * Displays two icons which can be toggled
 */
const IconToggle = props => {
  const { icon1, icon2, status, toggled } = props;

  /**
   * Derives the state of the icons
   */
  const icon1Status = toggled ? "hidden" : "active";
  const icon2Status = toggled ? "active" : "hidden";

  return (
    <Container className="icon-toggle" status={status} {...props}>
      <Icon status={icon1Status}>{icon1}</Icon>
      <Icon status={icon2Status}>{icon2}</Icon>
    </Container>
  );
};

IconToggle.propTypes = propTypes;
IconToggle.defaultProps = defaultProps;

export default IconToggle;
export {
  propTypes as IconTogglePropTypes,
  defaultProps as IconToggleDefaultProps
};
