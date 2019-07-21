# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

### Refactoring - v0.0.4

This is an intermediary step necessary to make sure all components satisfy the Single Responsibility Principle (SRP). Being my first React project I don't feel 100% confident all components are as slim as they should be at this stage.

The idea is to take every component, think about it as a single entity, separate from the rest of the project via Storybook and clean it up. Then connect back to the whole.

The aim is to have a set of reusable components (in other web projects, in other WordPress backed projects) and a set of project specific, non-reusable components.

Reusable components stay as thin as possible, project specific components can be heavy. Perhaps reusable components should be adapted back to the project via Context instead of adding lots of project specific props.

```
| Reusable components | Web                              | WordPress
----------------------------------------------------------------------------------------
|                     | Icon, IconToggle, Image,         | Category, Categories, Page, |
|                     | ImageResponsive, MenuDropdown,   | Pages, Post, Posts,         |
|                     | MenuItem, Meta, PlaceholderImage,| PostFeaturedImage, Settings |
|                     | SemanticHTML, Slide, Slides,     |                             |
|                     | Slider, Thumb, Thumbs            |                             |
----------------------------------------------------------------------------------------
|Non-reusable         | Project specific                 |                             |
----------------------------------------------------------------------------------------
|                     | Contact, Content, Home, Logo,    |                             |
|                     | Main, Menu                       |                             |
```
