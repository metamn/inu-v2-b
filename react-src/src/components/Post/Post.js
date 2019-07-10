import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Article as _Article } from "../SemanticHTML";
import Image from "../Image";

/**
 * Defines the prop types
 */
const propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Article",
  imageSrc: "The URL of the image"
};

/**
 * Styles the component container
 */
const Article = styled(_Article)(props => ({}));

/**
 * Displays the component
 */
const Post = props => {
  const { title, imageSrc } = props;

  return (
    <Article className="Post" title={title}>
      <Image src={imageSrc} title={title} />
    </Article>
  );
};

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default Post;
export { propTypes, defaultProps };
