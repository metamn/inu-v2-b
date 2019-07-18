# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

### Refactoring - v0.0.4

This is an intermediary step necessary to make sure all components satisfy the Single Responsibility Principle (SRP). Being my first React project I don't feel 100% confident all components are as slim as they should be. This refactoring will make sure they do.

The idea is to make project-independent components like Category, Dropdown Menu, Slider etc fully reusable, then make sure the project-specific components follow SRP.
