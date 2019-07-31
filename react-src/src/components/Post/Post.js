import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

import PostFeaturedImage, {
  PostFeaturedImagePropTypes,
  PostFeaturedImageDefaultProps
} from "../PostFeaturedImage";
import { Article as _Article } from "../SemanticHTML";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The post ID
   */
  id: PropTypes.string,
  /**
   * The post title
   */
  title: PropTypes.string,
  /**
   * The post index. A post might be part of a collection and needs to be indentified for example to handle clicks.
   */
  index: PropTypes.number,
  /**
   * The post featured image
   */
  ...PostFeaturedImagePropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: "1",
  title: "Post",
  index: 1,
  ...PostFeaturedImageDefaultProps
};

/**
 * Defines the query fragment needed by the component
 */
const queryFragment = {
  node: gql`
    fragment PostNode on Post {
      id
      title
      featuredImage {
        ...FeaturedImageNode
      }
    }
    ${PostFeaturedImage.fragments.node}
  `
};

/**
 * Styles the component container
 */
const Article = styled(_Article)(props => ({}));

/**
 * Displays the post.
 */
const Post = props => {
  const { title } = props;

  return (
    <Article className="Post" title={title}>
      <PostFeaturedImage featuredImageTitle={title} {...props} />
    </Article>
  );
};

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
Post.fragments = queryFragment;

export default Post;
export { propTypes as PostPropTypes, defaultProps as PostDefaultProps };
