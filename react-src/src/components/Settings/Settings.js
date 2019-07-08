import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import gql from "graphql-tag";

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
  title: "Title",
  url: "http://inu.ro",
  description: "Description"
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
 * Styles the component container
 */
const Container = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",

  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Settings = props => {
  const { title, description } = props;

  return (
    <Container className="Settings">
      Settings
      <ul>
        <li>
          Loads site settings ({title}, {description}) from the database
        </li>
      </ul>
    </Container>
  );
};

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;

export default Settings;
export { propTypes, defaultProps };
