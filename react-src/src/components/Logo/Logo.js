import React from "react";
import styled from "styled-components";

import { useTheme, Media } from "../../hooks";

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

  [`${Media.mobile}`]: {
    flexDirection: "column"
  },

  [`${Media.tablet}`]: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: props.theme.sizing.logo.width.tablet,

    "& .Description": {
      marginTop: "calc(var(--lem) / 1)"
    }
  },

  [`${Media.laptop}`]: {
    width: props.theme.sizing.logo.width.laptop
  }
}));

/**
 * Styles the title
 */
const Title = styled("h1")(props => ({}));

/**
 * Styles the description
 */
const Description = styled("h2")(props => ({
  width: "100%"
}));

/**
 * Styles the line
 */
const Line = styled("div")(props => ({
  [`${Media.tablet}`]: {
    display: "flex",
    width: "calc(var(--lem) * 8)",
    height: "var(--lem)",
    borderBottom: "1px solid",
    transform: props.theme.sizing.line.transform.tablet,

    [`${Media.laptop}`]: {
      transform: props.theme.sizing.line.transform.laptop
    }
  }
}));

/**
 * Displays site title and description
 */
const Logo = props => {
  /**
   * Loads logo props
   */
  const { title, url, description } = props;

  /**
   * Loads theme
   */
  const { theme } = useTheme();

  return (
    <Header className="Logo" theme={theme}>
      <Title className="Title">
        <Link url={url} title={title}>
          {title}
        </Link>
      </Title>
      <Description className="Description">{description}</Description>
      <Line className="Line" theme={theme} />
    </Header>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
export { propTypes, defaultProps };
