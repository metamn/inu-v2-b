import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

import Image from "../Image";

/**
 * Defines the prop types
 */
const propTypes = {
  featuredImage: PropTypes.shape({
    id: PropTypes.string,
    sourceUrl: PropTypes.string,
    alt: PropTypes.string,
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
  }),
  featuredImageType: PropTypes.oneOf[("slider", "thumbs")]
};

/**
 * Defines the default props
 */
const defaultProps = {
  featuredImage: {
    id: "cG9zdDoxMQ==",
    sourceUrl: "http://localhost/react-wp/wp-content/uploads/2019/05/Bg.jpeg",
    alt: "Bg image",
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
  },
  featuredImageType: "slider"
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
 * Returns a responsive image
 */
const responsiveImage = props => {
  const { alt, sourceUrl, mediaDetails } = props;
  const { sizes } = mediaDetails;

  let srcSet = sizes.map(item => `${item.sourceUrl} ${item.width}w`);
  srcSet.push(`${sourceUrl} ${mediaDetails.width}w`);

  let srcSetWidths = sizes.map(item => item.width);
  srcSetWidths.push(mediaDetails.width);

  return (
    <Image
      src={sourceUrl}
      alt={alt}
      srcSet={srcSet}
      srcSetWidths={srcSetWidths}
    />
  );
};

/**
 * Returns a thumbnail image
 */
const thumbnailImage = props => {
  const { alt, mediaDetails } = props;
  const { sizes } = mediaDetails;
  const thumbnail = sizes.filter(size => size.name === "thumbnail");
  const { sourceUrl, width, height } = thumbnail[0];

  return (
    <Image
      isProgressive={false}
      src={sourceUrl}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

/**
 * Displays the post featured image
 */
const PostFeaturedImage = props => {
  const { featuredImage, featuredImageType } = props;
  const { alt, sourceUrl, mediaDetails } = featuredImage;
  const { sizes } = mediaDetails;

  const image =
    featuredImageType === "slider"
      ? responsiveImage(featuredImage)
      : thumbnailImage(featuredImage);

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
