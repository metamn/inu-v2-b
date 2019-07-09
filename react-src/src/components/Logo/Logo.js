import React from "react";
import styled from "styled-components";

import { SettingsPropTypes, SettingsDefaultProps } from "../Settings";

/**
 * Defines the prop types
 */
const propTypes = {
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
const Container = styled("div")(props => ({
  display: "flex",
  flexDirection: "column"
}));

/**
 * Displays site title and description
 */
const Logo = props => {
  const { title, url, description } = props;

  return (
    <Container className="Logo">
      <div>
        <a href={url}>{title}</a>
      </div>
      <div>{description}</div>
    </Container>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
export { propTypes, defaultProps };
