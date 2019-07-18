import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressiveImage from "react-progressive-image";

import { Breakpoints, Media } from "../../hooks";
import { ImagePropTypes, ImageDefaultProps } from "../Image";
import { createPlaceholderImageUrl } from "../PlaceholderImage";

import { SliderContext } from "../Slider";
import { ThumbsContext } from "../Thumbs";
import { MainContext } from "../Main";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The basic image props
   */
  ...ImagePropTypes,
  /**
   * A set of image sources
   */
  srcSet: PropTypes.string,
  /**
   * A set of source sizes
   */
  sizes: PropTypes.string,
  /**
   * The widths used in the srcSet.
   * They will be passed to media queries to avoid image flicks on loading.
   */
  srcSetWidths: PropTypes.arrayOf(PropTypes.string),
  /**
   * To use ProgressiveImage?
   */
  isProgressive: PropTypes.bool,
  /**
   * Is it still loading?
   */
  isLoading: PropTypes.bool,
  /**
   * Delay the loading of the image in miliseconds
   */
  delay: PropTypes.number
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...ImageDefaultProps,
  srcSet: "",
  sizes: "",
  srcSetWidths: null,
  isProgressive: true,
  isLoading: false,
  delay: 0
};

/**
 * Styles the component container
 */
const Img = styled("img")(props => ({
  opacity: props.isLoading ? "0.3" : "1",
  ...props.widths
}));

/**
 * Creates `max-width:`s for various CSS breakpoints.
 *
 * Used to prevent image flicking on load.
 *
 * When `srcset`, `sizes` is used the image has to be made responsive also in CSS. Otherwise after the responsive image is loaded it will flick because the preloader image in `src` has a single size instead of the same responsive sizes.
 *
 * Example:
 * ```
 * <img src="http://metamn.io/assets/images/beat-home-mobile_desktop.png" srcset="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w" sizes="(max-width: 767px) 306px, (max-width: 1024px) 535px, (max-width:1600px) 622px, 898px" />
 * ```
 * Let's say on tablet initially the `beat-home-mobile_desktop.png` of 622px width is loaded since it's in the `src` attribute. Then it will be replaced by `home-mobile_tablet.png` which is 535px wide. This causes a flick.
 *
 */
const createWidths = props => {
  const { breakpoints } = props;
  let { widths } = props;

  /**
   * `breakpoints` are like: [320,768,1280,1440]
   * `widths` are like: [150,300,768,1024,1181] or [150, 200, 572] or [306, 525, 622, 898]
   * `maxWidths` should be like: [320:300, 768:768, 1280:1024, 1440:1181] or [320:200, 768:572, 1280:572, 1440:572]
   */

  widths.shift();
  const wlength = widths.length;
  const wlast = widths[wlength - 1];
  const normalizedWidths = Object.keys(breakpoints).map((breakpoint, index) =>
    index < wlength ? widths[index] : wlast
  );

  return {
    [`${Media.mobile}`]: {
      width: `${normalizedWidths[0]}px`
    },

    [`${Media.tablet}`]: {
      width: `${normalizedWidths[1]}px`
    },

    [`${Media.laptop}`]: {
      width: `${normalizedWidths[2]}px`
    },

    [`${Media.desktop}`]: {
      width: `${normalizedWidths[3]}px`
    }
  };
};

/**
 * Displays an image
 *
 * @see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 *
 * @see https://github.com/FormidableLabs/react-progressive-image
 */
const ImageResponsive = props => {
  /**
   * Loads image properties
   */
  const {
    src,
    srcSet,
    srcSetWidths,
    sizes,
    alt,
    width,
    height,
    placeholder,
    isProgressive,
    isLoading,
    delay,
    index,
    clickHandler
  } = props;

  /**
   * Creates a placeholder image.
   */
  const placeholderImage = createPlaceholderImageUrl(placeholder);

  /**
   * Returns a placeholder if the image is missing
   */
  const nonEmptySrc = src !== "" ? src : placeholderImage;

  /**
   * Sets a responsive width for each breakpoint to avoid image flicking
   */
  const widths =
    srcSetWidths === null
      ? null
      : createWidths({
          widths: srcSetWidths,
          breakpoints: Breakpoints
        });

  /**
   * Sets up an image click handler
   *
   * For thumbs and slider there is a different handler
   */
  const { activeContentDisplayMode } = useContext(MainContext);
  const slideClickHandler = useContext(SliderContext);
  const thumbClickHandler = useContext(ThumbsContext);
  const imageClickHandler =
    activeContentDisplayMode === "slider"
      ? slideClickHandler
        ? slideClickHandler
        : clickHandler
      : thumbClickHandler
      ? thumbClickHandler
      : clickHandler;

  /**
   * Returns a ProgressiveImage if requested. Otherwise a simple HTML image
   */
  return isProgressive ? (
    <ProgressiveImage
      src={nonEmptySrc}
      srcSetData={{
        srcSet: srcSet,
        sizes: sizes
      }}
      placeholder={placeholderImage}
      delay={delay}
    >
      {(src, loading, srcSetData) => (
        <Img
          className="progressive-image"
          src={nonEmptySrc}
          alt={alt}
          srcSet={srcSetData.srcSet !== "" ? srcSetData.srcSet : null}
          sizes={srcSetData.sizes !== "" ? srcSetData.sizes : null}
          isLoading={loading}
          widths={widths !== null ? widths : null}
          onClick={() => imageClickHandler(index)}
        />
      )}
    </ProgressiveImage>
  ) : (
    <Img
      className="image"
      src={nonEmptySrc}
      alt={alt}
      srcSet={srcSet !== "" ? srcSet : null}
      sizes={sizes !== "" ? sizes : null}
      width={width !== "" ? width : null}
      height={height !== "" ? height : null}
      isLoading={isLoading}
      widths={widths !== null ? widths : null}
      onClick={() => imageClickHandler(index)}
    />
  );
};

ImageResponsive.propTypes = propTypes;
ImageResponsive.defaultProps = defaultProps;

export default ImageResponsive;
export { propTypes, defaultProps };
