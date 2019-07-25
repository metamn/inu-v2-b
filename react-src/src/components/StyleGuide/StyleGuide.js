import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Theme, { sgColors, sgScales } from "../Theme";
import { modularScale, getContrast, meetsContrastGuidelines } from "polished";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";

import Meta, { MetaPropTypes } from "../Meta";
import Logo from "../Logo";
import Menu from "../Menu";
import Icon from "../Icon";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Page title and url
   */
  ...MetaPropTypes
};

/**
 * Defines the default props
 */
const defaultProps = {
  title: "Styleguide",
  description: "for inu.ro",
  url: "http://inu.ro/styleguide"
};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  ...props.theme.colorPairs.default,
  ...props.theme.fonts.default
}));

/**
 * Styles the items container
 */
const ItemsContainer = styled("div")(props => ({
  display: "flex",
  flexWrap: "wrap",

  "> *": {
    marginRight: "calc(var(--lem) * 2)",
    marginBottom: "calc(var(--lem) * 2)"
  }
}));

/**
 * Styles the item container
 */
const ItemContainer = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

/**
 * Styles the color circle
 */
const Circle = styled("span")(props => ({
  display: "flex",
  width: "calc(var(--lem) * 3)",
  height: "calc(var(--lem) * 3)",
  borderRadius: "calc(var(--lem) * 3)",
  backgroundColor: props.color,
  border: props.color === props.current ? "1px solid" : "none"
}));

/**
 * Styles a text box
 */
const TextBox = styled("div")(props => ({
  ...props.fonts,

  maxWidth: "calc(var(--lem) * 25)",
  border: "1px solid",

  "& a": {
    ...props.link
  },

  "& .text": {
    ...props.colors,
    ...props.fonts,
    ...props.textStyle,
    padding: "var(--lem)"
  },

  "& .with-scale": {
    fontSize: props.scale ? modularScale(props.scale) : "inherit"
  },

  "& .details": {
    padding: "var(--lem)",
    borderTop: "1px solid"
  }
}));

/**
 * Styles the color contrast guideline
 */
const MeetsContrastItem = styled("span")(props => ({
  backgroundColor: props.ok ? "green" : "red",
  marginRight: "var(--lem)",
  padding: "calc(var(--lem) / 4)"
}));

/**
 * Creates a theme context
 */
const SgThemeContext = React.createContext({});

/**
 * Displays the styleguide.
 */
const StyleGuide = props => {
  /**
   * Sets up theme
   */
  const { starterTheme } = Theme();

  /**
   * Loads the theme
   */
  const { theme } = starterTheme;

  const {
    colorPairs,
    fonts,
    textStyles,
    links,
    icons,
    cursors,
    themeUri
  } = theme;

  /**
   * Displays the icons
   */
  const iconList = Object.keys(icons).map(name => {
    const value = icons[name];

    return (
      <ItemContainer>
        <div class="text">
          <Icon>{value}</Icon>
        </div>
        <div class="details">
          <p>{name}</p>
        </div>
      </ItemContainer>
    );
  });

  /**
   * Displays the cursors
   */
  const cursorList = Object.keys(cursors).map(name => {
    const value = cursors[name];
    const src = `${themeUri}/${value}`;

    return (
      <ItemContainer>
        <img src={src} alt="cursor" />
        <div class="details">
          <p>{name}</p>
        </div>
      </ItemContainer>
    );
  });

  /**
   * Displays the colors
   */
  const colorSwatches = Object.keys(sgColors).map(name => {
    const value = sgColors[name];
    const currentColors = colorPairs.default;
    const { backgroundColor } = currentColors;

    return (
      <ItemContainer className="color">
        <Circle className="circle" color={value} current={backgroundColor} />
        <span className="text">{name}</span>
      </ItemContainer>
    );
  });

  /**
   * Displays the color pairs
   */
  const colorTexts = Object.keys(colorPairs).map(name => {
    const { color, backgroundColor } = colorPairs[name];

    const contrast = getContrast(color, backgroundColor);
    const meetsContrast = meetsContrastGuidelines(color, backgroundColor);

    const meetsContrastItems = Object.keys(meetsContrast).map(key => (
      <MeetsContrastItem ok={meetsContrast[key]}>{key}</MeetsContrastItem>
    ));

    return (
      <TextBox
        name={name}
        colors={theme.colorPairs[name]}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div class="text">
          Colors don't exist alone yet in pairs, like black on white. All color
          pairs have a contrast ratio set for perfect readability.
        </div>
        <div class="details">
          <p>Name: {name}</p>
          <p>Contrast ratio: {contrast}</p>
          <p>Meets guidelines: {meetsContrastItems}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the fonts used
   */
  const fontTexts = Object.keys(fonts).map(name => {
    const { fontFamily } = fonts[name];

    return (
      <TextBox
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts[name]}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div class="text">
          Hello, I'm a designer and developer creating user interfaces and
          experiences for the web.
        </div>
        <div class="details">
          <p>Name: {name}</p>
          <p>Font family: {fontFamily}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the typographic scale
   */
  const scaleTexts = Object.keys(sgScales).map(name => {
    const value = sgScales[name];

    return (
      <TextBox
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        scale={value}
        link={theme.links.default}
      >
        <div class="text with-scale">
          Typographic grid and scale. Different font sizes based on the{" "}
          <a
            href="https://polished.js.org/docs/#modularscale"
            title="Modular Scale"
          >
            Modular Scale.
          </a>
        </div>
        <div class="details">
          <p>Name: {name}</p>
          <p>Modular scale: {value}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the link styles
   */
  const linkTexts = Object.keys(links).map(name => {
    const value = links[name];

    return (
      <TextBox
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={value}
      >
        <div class="text">
          <a href="#" title="link">
            This is the {name} link style. No decoration just on hover.
          </a>
        </div>
        <div class="details">
          <p>Name: {name}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the text styles
   */
  const textStyleTexts = Object.keys(textStyles).map(name => {
    const value = textStyles[name];

    return (
      <TextBox
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={value}
        link={theme.links.default}
      >
        <div class="text">
          This is the default text. With a high contrast background and a modern
          typeface with extra letter spacing it should look electric, vibrant,
          energizing on all displays.
        </div>
        <div class="details">
          <p>Name: {name}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the menu
   */
  const menuItems = [
    {
      id: "icons",
      name: "Icons",
      url: "#icons"
    },
    {
      id: "cursors",
      name: "Cursors",
      url: "#cursors"
    },
    {
      id: "colors",
      name: "Colors",
      url: "#colors"
    },
    {
      id: "colorpairs",
      name: "Color pairs",
      url: "#colorpairs"
    },
    {
      id: "fonts",
      name: "Fonts",
      url: "#fonts"
    },
    {
      id: "scales",
      name: "Scale",
      url: "#scales"
    },
    {
      id: "links",
      name: "Links",
      url: "#links"
    },
    {
      id: "text-styles",
      name: "Text styles",
      url: "#text-styles"
    }
  ];

  return (
    <>
      <Reset />
      <Meta {...props} />
      <SgThemeContext.Provider value={starterTheme}>
        <TypographicGrid />
        <Container className="StyleGuide" theme={theme}>
          <Logo {...props} />
          <Menu items={menuItems} />

          <ItemsContainer id="icons" className="Icons">
            {iconList}
          </ItemsContainer>

          <ItemsContainer id="cursors" className="Cursors">
            {cursorList}
          </ItemsContainer>

          <ItemsContainer id="colors" className="Colors">
            {colorSwatches}
          </ItemsContainer>

          <ItemsContainer id="colorpairs" className="ColorTexts">
            {colorTexts}
          </ItemsContainer>

          <ItemsContainer id="fonts" className="FontTexts">
            {fontTexts}
          </ItemsContainer>

          <ItemsContainer id="scales" className="Scales">
            {scaleTexts}
          </ItemsContainer>

          <ItemsContainer id="links" className="Links">
            {linkTexts}
          </ItemsContainer>

          <ItemsContainer id="text-styles" className="textStyles">
            {textStyleTexts}
          </ItemsContainer>
        </Container>
      </SgThemeContext.Provider>
    </>
  );
};

StyleGuide.propTypes = propTypes;
StyleGuide.defaultProps = defaultProps;

export default StyleGuide;
export { propTypes, defaultProps };
