import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  categories: PropTypes.array,
  random: PropTypes.string,
  contact: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  categories: ["Categories"],
  random: "Random",
  contact: "Contact"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({}));

/**
 * Displays the menu
 */
const Menu = props => {
  /**
   * Displays categories, and `Random`, `Contact` menu items
   */
  const { categories, random, contact } = props;

  /**
   * Displays a menu switcher icon
   */
  const menuSwitcherIcon = "Menu switcher icon";

  return (
    <Container className="Menu">
      Menu
      <ul>
        <li>{categories[0]}</li>
        <li>{random}</li>
        <li>{contact}</li>
      </ul>
      <ul>
        <li>{menuSwitcherIcon}</li>
      </ul>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
