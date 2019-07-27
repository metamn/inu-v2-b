import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  modularScale,
  getContrast,
  meetsContrastGuidelines,
  wordWrap
} from "polished";

import { Media } from "./../../hooks";

import Theme, { sgColors, sgScales } from "../Theme";
import { ThemeContext } from "../Home";

import Reset from "../Reset";
import TypographicGrid from "../TypographicGrid";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "../Settings";
import Meta from "../Meta";
import Logo from "../Logo";
import Icon from "../Icon";
import Link from "../Link";
import { Section as _Section } from "../SemanticHTML";

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
  ...props.theme.fonts.default,

  [`${Media.mobile}`]: {
    ...props.theme.padding.mobile
  },

  [`${Media.tablet}`]: {
    ...props.theme.padding.tablet
  },

  [`${Media.laptop}`]: {
    ...props.theme.padding.laptop
  },

  [`${Media.desktop}`]: {
    ...props.theme.padding.desktop
  }
}));

/**
 * Styles the menu container
 */
const Menu = styled("ul")(props => ({
  margin: "calc(var(--lem) * 2) 0 var(--lem)",
  listStyle: "none"
}));

/**
 * Styles the menu items
 */
const MenuItem = styled("li")(props => ({
  marginBottom: "var(--lem)",
  borderBottom: "1px solid"
}));

/**
 * Styles the styleguide entries container
 */
const StyleguideEntries = styled("div")(props => ({}));

/**
 * Styles the items container
 */
const ItemsContainer = styled(_Section)(props => ({
  display: "flex",
  flexDirection: "column",
  margin: "calc(var(--lem) * 2) 0",

  "& .title": {
    display: "flex",
    borderBottom: "1px solid",
    margin: "var(--lem) 0"
  },

  "& .content": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
}));

/**
 * Styles the item container
 */
const ItemContainer = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "calc(var(--lem) * 6)",
  marginBottom: "var(--lem)",

  "& .Details, & .Text": {
    ...wordWrap("break-word"),
    marginTop: "var(--lem)",

    "& > *": {
      ...wordWrap("break-word")
    }
  }
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
  ...wordWrap("break-word"),

  width: "100%",
  maxWidth: "calc(var(--lem) * 25)",
  border: "1px solid",
  marginBottom: "var(--lem)",

  "& a": {
    ...props.link
  },

  "& .Text": {
    ...props.colors,
    ...props.fonts,
    ...props.textStyle,
    padding: "var(--lem)"
  },

  "& .withScale": {
    fontSize: props.scale ? modularScale(props.scale) : "inherit"
  },

  "& .Details": {
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
      <ItemContainer className="ItemContainer Icon" key={index}>
        <div className="Text">
          <Icon>{value}</Icon>
        </div>
        <div className="Details">
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
    const { image } = value;
    const src = `${themeUri}/${image}`;

    return (
      <ItemContainer className="ItemContainer Cursor" key={index}>
        <img src={src} alt="cursor" />
        <div className="Details">
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
      <ItemContainer key={index} className="ItemContainer Color">
        <Circle className="Circle" color={value} current={backgroundColor} />
        <span className="Text">{name}</span>
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
        className="TextBox"
        key={index}
        name={name}
        colors={theme.colorPairs[name]}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div className="Text">
          Colors don't exist alone yet in pairs, like black on white. All color
          pairs have a contrast ratio set for perfect readability.
        </div>
        <ul className="Details">
          <li>Name: {name}</li>
          <li>Contrast ratio: {contrast}</li>
          <li>Meets guidelines: {meetsContrastItems}</li>
        </ul>
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
        className="TextBox"
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts[name]}
        textStyle={theme.textStyles.default}
        link={theme.links.default}
      >
        <div className="Text">
          Hello, I'm a designer and developer creating user interfaces and
          experiences for the web.
        </div>
        <ul className="Details">
          <li>Name: {name}</li>
          <li>Font family: {fontFamily}</li>
        </ul>
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
        className="TextBox"
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        scale={value}
        link={theme.links.default}
      >
        <div className="Text withScale">
          Typographic grid and scale. Different font sizes based on the{" "}
          <a
            href="https://polished.js.org/docs/#modularscale"
            title="Modular Scale"
          >
            Modular Scale.
          </a>
        </div>
        <ul className="Details">
          <li>Name: {name}</li>
          <li>Modular scale: {value}</li>
        </ul>
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
        className="TextBox"
        key={index}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={theme.textStyles.default}
        link={value}
      >
        <div className="Text">
          <a href="#" title="link">
            This is the {name} link style. No decoration just on hover.
          </a>
        </div>
        <ul className="Details">
          <li>Name: {name}</li>
        </ul>
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
        className="TextBox"
        key={`test-${index}`}
        name={name}
        colors={theme.colorPairs.default}
        fonts={theme.fonts.default}
        textStyle={value}
        link={theme.links.default}
      >
        <div className="Text">
          This is the default text. With a high contrast background and a modern
          typeface with extra letter spacing it should look electric, vibrant,
          energizing on all displays.
        </div>
        <ul className="Details">
          <li>Name: {name}</li>
        </ul>
      </TextBox>
    );
  });

  /**
   * Displays the menu
   */
  const menu = [
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
   * Creates menu items
   */
  const menuItems = menu.map((item, index) => {
    const { id, name, url } = item;

    return (
      <MenuItem key={index}>
        <Link id={id} title={name} url={url}>
          {name}
        </Link>
      </MenuItem>
    );
  });

  /**
   * Creates styleguide entries
   */
  const styleguideEntries = menu.map((item, index) => {
    const { id, name, url, content } = item;

    return (
      <ItemsContainer
        id={id}
        className={name}
        key={index}
        title={name}
        theme={theme}
      >
        <div className="content">{content}</div>
      </ItemsContainer>
    );
  });

  /**
   * Loads site settings from the database
   */
  const siteSettings = Settings();

  return (
    <>
      <Reset />
      <Meta {...siteSettings} description="Styleguide" />
      <ThemeContext.Provider value={starterTheme}>
        <TypographicGrid />
        <Container className="StyleGuide" theme={theme}>
          <Logo {...siteSettings} description="Styleguide" />
          <Menu className="Menu">{menuItems}</Menu>
          <StyleguideEntries className="StyleguideEntries">
            {styleguideEntries}
          </StyleguideEntries>
        </Container>
      </ThemeContext.Provider>
    </>
  );
};

StyleGuide.propTypes = propTypes;
StyleGuide.defaultProps = defaultProps;

export default StyleGuide;
export { propTypes, defaultProps };
