import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { stringify } from "flatted";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Meta from "../Meta";
import Logo from "../Logo";
import Main from "../Main";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  ...SettingsPropTypes,
  themeSwitcherIcon: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  ...SettingsDefaultProps,
  themeSwitcherIcon: "Theme switcher icon"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the homepage
 */
const Home = props => {
  /**
   * Loads site settings from the database
   */
  const siteSettings = Settings(props);

  /**
   * Displays a theme switcher icon
   */
  const { themeSwitcherIcon } = props;

  return (
    <>
      <Meta {...siteSettings} />
      <Container className="Home">
        Home
        <Icon>{themeSwitcherIcon}</Icon>
        <Logo {...siteSettings} />
        <Main />
      </Container>
    </>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes, defaultProps };
