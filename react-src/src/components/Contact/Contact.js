import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Article as _Article } from "../SemanticHTML";

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
const Article = styled(_Article)(props => ({}));

/**
 * Displays the Contact page content
 */
const Contact = props => {
  const { content } = props;

  return (
    <Article
      className="Contact"
      title="Contact"
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
};

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;
export { propTypes, defaultProps };
