import React from "react";
import { Helmet } from "react-helmet";

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
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

Meta.propTypes = propTypes;
Meta.defaultProps = defaultProps;

export default Meta;
export { propTypes, defaultProps };
