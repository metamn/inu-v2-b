# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

### Theme - v0.0.5

1. Illegal HTML attributes / props should be eliminated.

   - ![Illegal attributes](./react-src/docs/design-illegal-attributes.png)

   - This happens when reserved prop names are added to components. See list of all reserved attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes

2. Presentational (Reusable Web) components should be semantically valid in the W3C checker.

![Semantic outline](./react-src/docs/design-semantic-outline.png)

3. Container (Non-reusable, project specific) components which holds the business logic should be fragments. This way the `divism` is highly reduced and the layout can be easily sketched with CSS Grid.

![No divism](./react-src/docs/design-no-divism.png)

4. All elements should be aligned to the grid both vertically and horizontally.

![Aligned to grid, on mobile screens](./react-src/docs/design-grid-mobile.png)
![Aligned to grid, on bigger than mobile screens](./react-src/docs/design-grid-mobile-and-up.png)
