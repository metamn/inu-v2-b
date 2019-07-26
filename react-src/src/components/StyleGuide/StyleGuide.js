import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { modularScale, getContrast, meetsContrastGuidelines } from "polished";

import Theme, { sgColors, sgScales } from "../Theme";
import { ThemeContext } from "../Home";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Meta from "../Meta";
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
  ...props.theme.colorPairs.default,
  ...props.theme.fonts.default
}));

/**
 * Styles the styleguide entries container
 */
const Entries = styled("div")(props => ({}));

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
  const iconList = Object.keys(icons).map((name, index) => {
    const value = icons[name];

    return (
      <ItemContainer key={index}>
        <div className="text">
          <Icon>{value}</Icon>
        </div>
        <div className="details">
          <p>{name}</p>
        </div>
      </ItemContainer>
    );
  });

  /**
   * Displays the cursors
   */
  const cursorList = Object.keys(cursors).map((name, index) => {
    const value = cursors[name];
    const src = `${themeUri}/${value}`;

    return (
      <ItemContainer key={index}>
        <img src={src} alt="cursor" />
        <div className="details">
          <p>{name}</p>
        </div>
      </ItemContainer>
    );
  });

  /**
   * Displays the colors
   */
  const colorSwatches = Object.keys(sgColors).map((name, index) => {
    const value = sgColors[name];
    const currentColors = colorPairs.default;
    const { backgroundColor } = currentColors;

    return (
      <ItemContainer key={index} className="color">
        <Circle className="circle" color={value} current={backgroundColor} />
        <span className="text">{name}</span>
      </ItemContainer>
    );
  });

  /**
   * Displays the color pairs
   */
  const colorTexts = Object.keys(colorPairs).map((name, index) => {
    const { color, backgroundColor } = colorPairs[name];

    const contrast = getContrast(color, backgroundColor);
    const meetsContrast = meetsContrastGuidelines(color, backgroundColor);

    const meetsContrastItems = Object.keys(meetsContrast).map(key => (
      <MeetsContrastItem key={key} ok={meetsContrast[key]}>
        {key}
      </MeetsContrastItem>
    ));

    return (
      <TextBox
        key={index}
        name={name}
        colors={theme.colorPairs[name]}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div className="text">
          Colors don't exist alone yet in pairs, like black on white. All color
          pairs have a contrast ratio set for perfect readability.
        </div>
        <div className="details">
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
  const fontTexts = Object.keys(fonts).map((name, index) => {
    const { fontFamily } = fonts[name];

    return (
      <TextBox
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts[name]}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div className="text">
          Hello, I'm a designer and developer creating user interfaces and
          experiences for the web.
        </div>
        <div className="details">
          <p>Name: {name}</p>
          <p>Font family: {fontFamily}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the typographic scale
   */
  const scaleTexts = Object.keys(sgScales).map((name, index) => {
    const value = sgScales[name];

    return (
      <TextBox
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        scale={value}
        link={theme.links.default}
      >
        <div className="text with-scale">
          Typographic grid and scale. Different font sizes based on the{" "}
          <a
            href="https://polished.js.org/docs/#modularscale"
            title="Modular Scale"
          >
            Modular Scale.
          </a>
        </div>
        <div className="details">
          <p>Name: {name}</p>
          <p>Modular scale: {value}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the link styles
   */
  const linkTexts = Object.keys(links).map((name, index) => {
    const value = links[name];

    return (
      <TextBox
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={value}
      >
        <div className="text">
          <a href="#" title="link">
            This is the {name} link style. No decoration just on hover.
          </a>
        </div>
        <div className="details">
          <p>Name: {name}</p>
        </div>
      </TextBox>
    );
  });

  /**
   * Displays the text styles
   */
  const textStyleTexts = Object.keys(textStyles).map((name, index) => {
    const value = textStyles[name];

    return (
      <TextBox
        key={`test-${index}`}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={value}
        link={theme.links.default}
      >
        <div className="text">
          This is the default text. With a high contrast background and a modern
          typeface with extra letter spacing it should look electric, vibrant,
          energizing on all displays.
        </div>
        <div className="details">
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
      url: "#icons",
      content: iconList
    },
    {
      id: "cursors",
      name: "Cursors",
      url: "#cursors",
      content: cursorList
    },
    {
      id: "colors",
      name: "Colors",
      url: "#colors",
      content: colorSwatches
    },
    {
      id: "colorpairs",
      name: "Color pairs",
      url: "#colorpairs",
      content: colorTexts
    },
    {
      id: "fonts",
      name: "Fonts",
      url: "#fonts",
      content: fontTexts
    },
    {
      id: "scales",
      name: "Scale",
      url: "#scales",
      content: scaleTexts
    },
    {
      id: "links",
      name: "Links",
      url: "#links",
      content: linkTexts
    },
    {
      id: "text-styles",
      name: "Text styles",
      url: "#text-styles",
      content: textStyleTexts
    }
  ];

  /**
   * Loads site settings from the database
   */
  const siteSettings = Settings();

  /**
   * Creates styleguide entries`
   */
  const entries = menuItems.map((item, index) => {
    const { id, name, url, content } = item;

    return (
      <ItemsContainer id={id} className={name} key={index}>
        {content}
      </ItemsContainer>
    );
  });

  return (
    <>
      <Reset />
      <Meta {...siteSettings} />
      <ThemeContext.Provider value={starterTheme}>
        <TypographicGrid />
        <Container className="StyleGuide" theme={theme}>
          <Logo {...siteSettings} />
          <Menu items={menuItems} />
          <Entries>{entries}</Entries>
        </Container>
      </ThemeContext.Provider>
    </>
  );
};

StyleGuide.propTypes = propTypes;
StyleGuide.defaultProps = defaultProps;

export default StyleGuide;
export { propTypes, defaultProps };
