import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

import Image from "../Image";
import ImageResponsive from "../ImageResponsive";

/**
 * Defines the prop types
 */
const propTypes = {
  featuredImageTitle: PropTypes.string,
  featuredImageType: PropTypes.oneOf(["large", "thumbnail"]),
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
  featuredImageTitle: "Featured image",
  featuredImageType: "large",
  featuredImage: {
    id: "cG9zdDoxMQ==",
    sourceUrl: "http://localhost/react-wp/wp-content/uploads/2019/05/Bg.jpeg",
    mediaDetails: {
      file: "2019/05/Bg.jpeg",
      height: 1152,
      width: 2048,
      sizes: [
        {
          file: "Bg-150x150.jpeg",
          height: "150",
          mimeType: "image/jpeg",
          name: "thumbnail",
          sourceUrl:
            "http://localhost/react-wp/wp-content/uploads/2019/05/Bg-150x150.jpeg",
          width: "150"
        },
        {
          file: "Bg-300x169.jpeg",
          height: "169",
          mimeType: "image/jpeg",
          name: "medium",
          sourceUrl:
            "http://localhost/react-wp/wp-content/uploads/2019/05/Bg-300x169.jpeg",
          width: "300"
        },
        {
          file: "Bg-768x432.jpeg",
          height: "432",
          mimeType: "image/jpeg",
          name: "medium_large",
          sourceUrl:
            "http://localhost/react-wp/wp-content/uploads/2019/05/Bg-768x432.jpeg",
          width: "768"
        },
        {
          file: "Bg-1024x576.jpeg",
          height: "576",
          mimeType: "image/jpeg",
          name: "large",
          sourceUrl:
            "http://localhost/react-wp/wp-content/uploads/2019/05/Bg-1024x576.jpeg",
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
const Container = styled("div")(props => ({}));

/**
 * Creates a large, responsive image
 */
const responsiveImage = props => {
  const { featuredImageTitle, featuredImage } = props;
  const { sourceUrl, mediaDetails } = featuredImage;
  const { sizes } = mediaDetails;
  const { width } = mediaDetails;

  let srcSet = sizes.map(item => `${item.sourceUrl} ${item.width}w`);
  srcSet.push(`${sourceUrl} ${width}w`);

  let srcSetWidths = sizes.map(item => item.width);
  srcSetWidths.push(width.toString());

  return (
    <ImageResponsive
      src={sourceUrl}
      srcSet={srcSet.toString()}
      srcSetWidths={srcSetWidths}
      alt={featuredImageTitle}
    />
  );
};

/**
 * Creates a thumbnail image
 */
const thumbnailImage = props => {
  const { featuredImageTitle, featuredImage } = props;
  const { mediaDetails } = featuredImage;
  const { sizes } = mediaDetails;
  const thumbnail = sizes.filter(size => size.name === "thumbnail");
  const { sourceUrl, width, height } = thumbnail[0];

  return (
    <Image
      src={sourceUrl}
      alt={featuredImageTitle}
      width={width}
      height={height}
    />
  );
};

/**
 * Displays the post featured image
 */
const PostFeaturedImage = props => {
  const { featuredImageType } = props;

  /**
   * Either returns a simple image (thumbnail) or a large, responsive image.
   */
  const image =
    featuredImageType === "large"
      ? responsiveImage(props)
      : thumbnailImage(props);

  return <Container className="PostFeaturedImage">{image}</Container>;
};

PostFeaturedImage.propTypes = propTypes;
PostFeaturedImage.defaultProps = defaultProps;
PostFeaturedImage.fragments = queryFragment;

export default PostFeaturedImage;
export {
  propTypes as PostFeaturedImagePropTypes,
  defaultProps as PostFeaturedImageDefaultProps
};
