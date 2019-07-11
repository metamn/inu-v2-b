import React from "react";
import styled from "styled-components";

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
 * Styles the component container
 */
const Header = styled("header")(props => ({
  display: "flex",
  flexDirection: "column"
}));

/**
 * Styles the title
 */
const Title = styled("h1")(props => ({}));

/**
 * Styles the description
 */
const Description = styled("h2")(props => ({}));

/**
 * Displays site title and description
 */
const Logo = props => {
  const { title, url, description } = props;

  return (
    <Header className="Logo">
      <Title className="Title">
        <a href={url} title={title}>
          {title}
        </a>
      </Title>
      <Description className="Description">{description}</Description>
    </Header>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
export { propTypes, defaultProps };
