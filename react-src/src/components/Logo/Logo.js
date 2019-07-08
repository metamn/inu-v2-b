import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Title",
  url: "#",
  description: "Description"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the logo
 */
const Logo = props => {
  const { title, description } = props;

  return (
    <Container className="Logo">
      Logo
      <ul>
        <li>
          Displays site {title}, {description}
        </li>
      </ul>
    </Container>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
export { propTypes, defaultProps };
