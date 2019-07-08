import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  content: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  content: "Contact page content"
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
const Contact = props => {
  const { content } = props;

  return (
    <Container className="Contact">
      Contact
      <ul>
        <li>Displays the {content}</li>
      </ul>
    </Container>
  );
};

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;
export { propTypes, defaultProps };
