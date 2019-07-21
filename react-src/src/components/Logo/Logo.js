import React from "react";
import styled from "styled-components";

import { Media } from "../../hooks";

import { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Link from "../Link";

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
 * Styles the line
 */
const Line = styled("div")(props => ({
  width: "calc(var(--lem) * 8)",
  height: "var(--lem)",
  borderBottom: "1px solid",
  transform: "rotate(-65deg)",
  display: "none"
}));

/**
 * Displays site title and description
 */
const Logo = props => {
  /**
   * Loads logo props
   */
  const { title, url, description } = props;

  return (
    <Header className="Logo">
      <Title className="Title">
        <Link url={url} title={title}>
          {title}
        </Link>
      </Title>
      <Description className="Description">{description}</Description>
      <Line />
    </Header>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
export { propTypes, defaultProps };
