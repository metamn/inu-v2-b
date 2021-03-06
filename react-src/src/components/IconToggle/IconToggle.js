import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon, { IconPropTypes, IconDefaultProps } from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The first, active by default icon
   */
  icon1: PropTypes.shape(IconPropTypes),
  /**
   * The second, inactive by default icon
   */
  icon2: PropTypes.shape(IconPropTypes),
  /**
   * The component status
   */
  status: IconPropTypes.status,
  /**
   * The initial toggle icon status
   */
  toggled: PropTypes.bool
};

/**
 * Defines the default props
 */
const defaultProps = {
  icon1: IconDefaultProps,
  icon2: IconDefaultProps,
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
 * Displays two icons which can be toggled.
 *
 * The toggle click handler should come from a parent component.
 */
const IconToggle = props => {
  const { icon1, icon2, status, toggled } = props;

  /**
   * Derives the state of the icons
   */
  const icon1Status = toggled ? "hidden" : "active";
  const icon2Status = toggled ? "active" : "hidden";

  /**
   * Removes the icon click handler
   */
  const iconClickHandler = () => {};

  return (
    <Container className="IconToggle" status={status} {...props}>
      <Icon {...icon1} status={icon1Status} clickHandler={iconClickHandler} />
      <Icon {...icon2} status={icon2Status} clickHandler={iconClickHandler} />
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
