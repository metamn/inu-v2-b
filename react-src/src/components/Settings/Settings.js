import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { stringify } from "flatted";

import { useData } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Inu Chivu",
  url: "http://inu.ro",
  description: "Photo traveler"
};

/**
 * Defines the database query
 */
const query = gql`
  query generalSettings {
    generalSettings {
      title
      url
      description
    }
  }
`;

/**
 * Loads site settings from the database
 */
const Settings = props => {
  return useData(defaultProps, query, "generalSettings");
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
export { propTypes as SettingsPropTypes, defaultProps as SettingsDefaultProps };
