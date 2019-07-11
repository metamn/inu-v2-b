import React from "react";
import PropTypes from "prop-types";
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
 * @see https://gist.github.com/kevinSuttle/1997924
 */
const Meta = props => {
  const { title, description, url } = props;

  return (
    <Helmet>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width" />
      <meta name="url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

Meta.propTypes = propTypes;
Meta.defaultProps = defaultProps;

export default Meta;
export { propTypes, defaultProps };
