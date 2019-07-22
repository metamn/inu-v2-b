import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme, Media } from "./../../hooks";
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
const Article = styled(_Article)(props => ({
  [`${Media.mobile}`]: {
    height: "calc(100vh - var(--lem) * 10)"
  },

  "& .Content": {
    ...props.theme.colorPairs.inverted,
    padding: "var(--lem)",

    "& a": {
      ...props.theme.links.default,
      ...props.theme.colorPairs.default,
      padding: "calc(var(--lem) / 2)",
      border: "1px solid",
      display: "inline-block"
    },
    " & > *": {
      marginBottom: "var(--lem)"
    }
  }
}));

/**
 * Displays the Contact page content
 */
const Contact = props => {
  const { content } = props;
  const { theme } = useTheme();

  return (
    <Article className="Contact" title="Contact" theme={theme} {...props}>
      <div className="Content" dangerouslySetInnerHTML={{ __html: content }} />
    </Article>
  );
};

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;
export { propTypes, defaultProps };
