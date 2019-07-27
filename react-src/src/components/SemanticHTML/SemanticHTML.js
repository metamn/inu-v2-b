import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The element name.
   */
  elementName: PropTypes.oneOf(["section", "article", "aside", "nav"])
    .isRequired,
  /**
   * The element class name.
   * Required to make it later styleable.
   */
  className: PropTypes.string.isRequired,
  /**
   * The element title.
   * Usually a string, but it can be a link too.
   */
  title: PropTypes.any.isRequired,
  /**
   * The element children.
   * Without children there is no use of this component.
   */
  children: PropTypes.any,
  /**
   * The element id.
   */
  id: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  elementName: "section",
  className: "section",
  titleElement: "Section Title",
  children: "Section body",
  id: null
};

/**
 * Defines default props for Section
 */
const defaultPropsForSection = {
  elementName: "section"
};

/**
 * Defines default props for Article
 */
const defaultPropsForArticle = {
  elementName: "article"
};

/**
 * Defines default props for Aside
 */
const defaultPropsForAside = {
  elementName: "aside"
};

/**
 * Defines default props for Nav
 */
const defaultPropsForNav = {
  elementName: "nav"
};

/**
 * Styles the semantic element title.
 *
 * It is always hidden because it is needed only by the HTML outliner / validator.
 */
const Title = styled("h3")([], {
  display: "none"
});

/**
 * Creates a semantic HTML element with title.
 *
 * Semantic elements with title are properly outlined in https://validator.w3.org/.
 * When a HTML document outlines perfectly it means its component structure is flawless.
 * Many times an invalid outline structure points to errors in component design and helps fix it.
 *
 * Returns something like: `<section><h3>section title</h3>...children</section>` where the title is hidden by default
 *
 * NOTE: since we have inside an element a title + content it will act as a list so we have to provide unique `key` props
 *
 */
const SemanticHTMLElement = props => {
  const { elementName, children, className, title, id } = props;

  const titleElement = React.createElement(
    Title,
    { className: "title", key: 1 },
    title
  );

  return React.createElement(
    elementName,
    { className: className, key: 2, id: id },
    [titleElement, children]
  );
};

SemanticHTMLElement.propTypes = propTypes;
SemanticHTMLElement.defaultProps = defaultProps;

/**
 * Creates a `<section>` element
 */
const Section = props => {
  return SemanticHTMLElement(props);
};

Section.propTypes = propTypes;
Section.defaultProps = defaultPropsForSection;

/**
 * Creates an `<article>` element
 */
const Article = props => {
  return SemanticHTMLElement(props);
};

Article.propTypes = propTypes;
Article.defaultProps = defaultPropsForArticle;

/**
 * Creates an `<aside>` element
 */
const Aside = props => {
  return SemanticHTMLElement(props);
};

Aside.propTypes = propTypes;
Aside.defaultProps = defaultPropsForAside;

/**
 * Creates a `<nav>` element
 */
const Nav = props => {
  return SemanticHTMLElement(props);
};

Nav.propTypes = propTypes;
Nav.defaultProps = defaultPropsForNav;

export { Section, Article, Aside, Nav };
