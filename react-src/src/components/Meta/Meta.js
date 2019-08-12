import React from "react";
import { Helmet } from "react-helmet";

import { useTheme } from "../../hooks";

import { SettingsPropTypes, SettingsDefaultProps } from "../Settings";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The site settings
   */
  ...SettingsPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...SettingsDefaultProps
};

/**
 * Sets up the document `<head>`
 *
 * Returns a list of meta tags and links. For the complete list of possible items
 * @see https://gist.github.com/kevinSuttle/1997924
 */
const Meta = props => {
  const { title, description, url } = props;

  const { theme } = useTheme();
  const { imageUri } = theme;

  const favicon = `${imageUri}/favicon.ico`;
  const favicon32 = `${imageUri}/favicon-32x32.png`;
  const faviconApple = `${imageUri}/apple-touch-icon.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width" />
      <meta name="url" content={url} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <link rel="canonical" href={url} />
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="icon" type="image/png" href={favicon32} />
      <link rel="apple-touch-icon" href={faviconApple} />
    </Helmet>
  );
};

Meta.propTypes = propTypes;
Meta.defaultProps = defaultProps;

export default Meta;
export { propTypes, defaultProps };
