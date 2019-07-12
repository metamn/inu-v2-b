import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  name: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  name: "Menu item"
};

/**
 * Styles the component container
 */
const Container = styled("li")(props => ({}));

/**
 * Displays the component
 */
const MenuItem = props => {
  const { name } = props;
  return <Container className="MenuItem">{name}</Container>;
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
export { propTypes, defaultProps };
