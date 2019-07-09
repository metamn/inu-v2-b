import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The Contact page content in HTML
   */
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
 * Displays the Contact page content
 */
const Contact = props => {
  const { content } = props;

  return (
    <Container
      className="Contact"
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
};

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;
export { propTypes, defaultProps };
