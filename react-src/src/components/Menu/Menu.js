import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useTheme } from "./../../hooks";

import { CategoriesPropTypes, CategoriesDefaultProps } from "../Categories";
import MenuItem from "../MenuItem";
import IconToggle from "../IconToggle";

/**
 * Defines the prop types
 */
const propTypes = {
  categories: PropTypes.shape(CategoriesPropTypes),
  random: PropTypes.string,
  contact: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  categories: PropTypes.shape(CategoriesDefaultProps),
  random: "Random slideshow",
  contact: "Contact"
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
 * Displays the menu
 */
const Menu = props => {
  /**
   * Displays categories, and `Random`, `Contact` menu items
   */
  const { categories, random, contact } = props;

  /**
   * Displays categories as menu items
   */
  const categoriesAsMenuItems = categories.edges.map((edge, index) => {
    return <MenuItem key={`category-${index}`} name={edge.node.name} />;
  });

  /**
   * Displays a menu switcher icon
   */
  const { theme } = useTheme();
  const { icons } = theme;
  const icon1 = theme.icons.chevronDown;
  const icon2 = theme.icons.chevronUp;

  return (
    <Container className="Menu">
      Menu
      <IconToggle icon1={icon1} icon2={icon2} />
      <ul>
        {categoriesAsMenuItems}
        <MenuItem key="random" name={random} />
        <MenuItem key="contact" name={contact} />
      </ul>
    </Container>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
export { propTypes, defaultProps };
