import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

import { useTheme } from "../../hooks";

import Image from "../Image";
import ImageResponsive from "../ImageResponsive";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The featured image title
   */
  featuredImageTitle: PropTypes.string,
  /**
   * The featured image type
   */
  featuredImageType: PropTypes.oneOf(["large", "thumbnail"]),
  /**
   * The post index. A post might be part of a collection and needs to be indentified for example to handle clicks.
   */
  index: PropTypes.number,
  /**
   * The featured image
   */
  featuredImage: PropTypes.shape({
    id: PropTypes.string,
    sourceUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      file: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
      sizes: PropTypes.arrayOf(
        PropTypes.shape({
          file: PropTypes.string,
          height: PropTypes.string,
          mimeType: PropTypes.string,
          name: PropTypes.string,
          sourceUrl: PropTypes.string,
          width: PropTypes.string
        })
      )
    })
  })
};

/**
 * Defines the default props
 */
const defaultProps = {
  featuredImageTitle: "",
  featuredImageType: "large",
  index: 1,
  featuredImage: {
    id: "cG9zdDoxMQ==",
    sourceUrl: "<THEME_URI>/default-image<COLOR_SCHEME>.png",
    mediaDetails: {
      file: "default-image.png",
      height: 732,
      width: 1316,
      sizes: [
        {
          file: "default-image-150x150<COLOR_SCHEME>.png",
          height: "150",
          mimeType: "image/png",
          name: "thumbnail",
          sourceUrl: "<THEME_URI>/default-image-150x150<COLOR_SCHEME>.png",
          width: "150"
        },
        {
          file: "default-image-300x167<COLOR_SCHEME>.png",
          height: "167",
          mimeType: "image/png",
          name: "medium",
          sourceUrl: "<THEME_URI>/default-image-300x167<COLOR_SCHEME>.png",
          width: "300"
        },
        {
          file: "default-image-786x427<COLOR_SCHEME>.png",
          height: "427",
          mimeType: "image/png",
          name: "medium",
          sourceUrl: "<THEME_URI>/default-image-768x427<COLOR_SCHEME>.png",
          width: "768"
        },
        {
          file: "default-image-1024x570<COLOR_SCHEME>.png",
          height: "570",
          mimeType: "image/png",
          name: "medium",
          sourceUrl: "<THEME_URI>/default-image-1024x570<COLOR_SCHEME>.png",
          width: "1024"
        }
      ]
    }
  }
};

/**
 * Defines the query fragment needed by the component
 */
const queryFragment = {
  node: gql`
    fragment FeaturedImageNode on MediaItem {
      id
      sourceUrl
      mediaDetails {
        file
        height
        width
        sizes {
          file
          height
          mimeType
          name
          sourceUrl
          width
        }
      }
    }
  `
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  visibility: props.isLoading ? "hidden" : "visible"
}));

/**
 * Creates a large, responsive image
 */
const responsiveImage = props => {
  const {
    featuredImageTitle,
    featuredImage,
    index,
    theme,
    colorScheme
  } = props;
  const { sourceUrl, mediaDetails } = featuredImage;
  const { sizes } = mediaDetails;
  const { width } = mediaDetails;

  /**
   * Sets up the responsive image.
   */
  let srcSet = sizes.map(item => `${item.sourceUrl} ${item.width}w`);
  srcSet.push(`${sourceUrl} ${width}w`);

  let srcSetSizes = sizes.map(
    item => `(max-width: ${item.width}px) ${item.width}px`
  );
  srcSetSizes.push(`${width}px`);

  let srcSetWidths = sizes.map(item => item.width);
  srcSetWidths.push(width.toString());

  /**
   * Sets up the default responsive image
   */
  const { themeUri } = theme;
  let newSourceUrl = sourceUrl.replace(/<THEME_URI>/g, themeUri);
  srcSet = srcSet.toString().replace(/<THEME_URI>/g, themeUri);

  newSourceUrl =
    colorScheme === "dark"
      ? newSourceUrl.replace(/<COLOR_SCHEME>/g, "-black")
      : newSourceUrl.replace(/<COLOR_SCHEME>/g, "");

  srcSet =
    colorScheme === "dark"
      ? srcSet.replace(/<COLOR_SCHEME>/g, "-black")
      : srcSet.replace(/<COLOR_SCHEME>/g, "");

  /**
   * Checks if the image is still loading
   */
  const isLoading = newSourceUrl.indexOf("default-image") !== -1;

  return {
    image: (
      <ImageResponsive
        src={newSourceUrl}
        srcSet={srcSet.toString()}
        sizes={srcSetSizes.toString()}
        srcSetWidths={srcSetWidths}
        alt={featuredImageTitle}
        index={index}
        delay={0}
      />
    ),
    isLoading: isLoading
  };
};

/**
 * Creates a thumbnail image
 */
const thumbnailImage = props => {
  const { featuredImageTitle, featuredImage, index } = props;
  const { mediaDetails } = featuredImage;
  const { sizes } = mediaDetails;
  const thumbnail = sizes.filter(size => size.name === "thumbnail");
  const { sourceUrl, width, height } = thumbnail[0];

  /**
   * Checks if the image is still loading
   */
  const isLoading = sourceUrl.indexOf("default-image") !== -1;

  return {
    image: (
      <Image
        src={sourceUrl}
        alt={featuredImageTitle}
        width={width}
        height={height}
        index={index}
      />
    ),
    isLoading: isLoading
  };
};

/**
 * Displays the post featured image
 */
const PostFeaturedImage = props => {
  /**
   * Loads image type
   */
  const { featuredImageType } = props;

  /**
   * Loads theme
   */
  const { theme, colorScheme } = useTheme();

  /**
   * Either returns a simple image (thumbnail) or a large, responsive image.
   */
  const { image, isLoading } =
    featuredImageType === "large"
      ? responsiveImage({ ...props, theme, colorScheme })
      : thumbnailImage({ ...props, theme, colorScheme });

  return (
    <Container className="PostFeaturedImage" isLoading={isLoading}>
      {image}
    </Container>
  );
};

PostFeaturedImage.propTypes = propTypes;
PostFeaturedImage.defaultProps = defaultProps;
PostFeaturedImage.fragments = queryFragment;

export default PostFeaturedImage;
export {
  propTypes as PostFeaturedImagePropTypes,
  defaultProps as PostFeaturedImageDefaultProps
};
