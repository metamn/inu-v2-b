import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The link url
   */
  url: PropTypes.string,
  /**
   * The link title
   */
  title: PropTypes.string,
  /**
   * The link content
   */
  children: PropTypes.any,
  /**
   * The link style
   */
  linkStyle: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  url: "http://example.com",
  title: "http://example.com",
  children: "http://example.com",
  linkStyle: "default"
};

/**
 * Styles the link
 */
const Container = styled("a")(props => ({
  ...props.theme.links.default,
  ...props.theme.colorPairs.default,
  ...props.theme.cursors.brutalistCursor2
}));

/**
 * Displays a HTML link element
 */
const Link = props => {
  const { url, children } = props;
  const { theme } = useTheme();

  return (
    <Container className="link" theme={theme} href={url} {...props}>
      {children}
    </Container>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
