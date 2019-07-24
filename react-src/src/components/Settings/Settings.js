import PropTypes from "prop-types";
import gql from "graphql-tag";

import { useData } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The site title
   */
  title: PropTypes.string,
  /**
   * The site url
   */
  url: PropTypes.string,
  /**
   * The site description
   */
  description: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Ioan Chivu",
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
  console.log("Settings");

  return useData(props, query, "generalSettings");
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
export { propTypes as SettingsPropTypes, defaultProps as SettingsDefaultProps };
