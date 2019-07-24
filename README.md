# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

### Mocks - v0.0.1

1. Mocking up the component structure and the functionality

![First iteration](./react-src/docs/mocks-1.png)

2. Adjusting component structure to the WP GraphQL API

![Second iteration](./react-src/docs/mocks-2.png)

3. Applying the single responsibility principle

![Third iteration](./react-src/docs/mocks-3.png)

4. Create requirement specification

With a little text cleanup the requirement specification is done!

![Fourth iteration](./react-src/docs/mocks-4.png)

### Static content (a.k.a data)- v0.0.2

- Start building up every component.
- From bottom to top starting with standalone components.
- Focus on props only, default values and _skip states_.
- Skip the UI/UX design part. Leave it as it is. Don't do theming. Default props should work.
- Check components also in Storybook.
- Leave no warnings in the console log.

1. Start with data components.
2. Continue with other (presentational) components.
3. Create additional components when necessary. Like `MenuItem` for `Menu`.
4. Don't fully implement all the features at this stage. Instead create Github Issues for later reuse.

![The final screenshot](./react-src/docs/data-1.png)

### Interaction - v0.0.3

1.  Go through each component which is handling interactive elements and implement their functionality. Usually with states.

    1.  To check if something is a state [answer these questions](https://reactjs.org/docs/thinking-in-react.html) and fill the table below. All answers must be `No` to make a candidate a state:

    ```
    | State candidate          | Props | Unchanged | Computable |
    -------------------------------------------------------------
    | state                    | No    | No        | No         |
    | ....                     | No    | No        | No         |
    ```

    2.  When adding state try to maintain some naming conventions. Like:

        1. `active` should mark a state. Ex.: `activeTheme`, `activeImage`, `activeMenuItem`. `current` should not mark a state.
        2. `State` suffix should be used where appropriate. Like `menuSwitcherIconState`.

    3.  Try to `useContext` to pass state when it will be consumed down deep in the tree.

2.  Connect states together. One state change might trigger another state changes. Connecting states usually changes the owner component of a state. To find the component which best owns a state (lifting state) this table can help:

```
| State                    | Home component | Other comps using the state | Common owner above |
------------------------------------------------------------------------------------------------
| state                    |                |                             |                    |
```

3. The generated docs should include implementations of every feature / requirement specification declared in previous stages. More, if tests were used from beginning this task now would be obvious.

#### Example

After implementing states (1.) we had:

```
| State candidate          | Props | Unchanged | Computable |
-------------------------------------------------------------
| activeTheme              | No    | No        | No         |
| activeMenuItem           | No    | No        | No         |
| menuSwitcherIconState    | No    | No        | No         |
| activeContentDisplayMode | No    | No        | No         |
| activeImage              | No    | No        | No         |
```

```
| State                    | Home component | Other comps using the state | Common owner above |
------------------------------------------------------------------------------------------------
| activeTheme              | Home           | Many, with `useContext`     | n/a                |
| activeMenuItem           | Main           | Content, MenuItem           | n/a                |
| menuSwitcherIconState    | Menu           | n/a                         | n/a                |
| activeContentDisplayMode | Content        | Thumbs                      | n/a                |
| activeImage              | Content        | Thumbs, Slider              | n/a                |
```

After connecting states (2.) we had:

```
| State                    | Home component | Other comps using the state | Common owner above |
------------------------------------------------------------------------------------------------
| activeTheme              | Home           | Many, with `useContext`     | n/a                |
| activeMenuItem           | Main           | Content, MenuItem           | n/a                |
| menuSwitcherIconState    | Main           | n/a                         | n/a                |
| activeContentDisplayMode | Main           | Thumbs                      | n/a                |
| activeImage              | Content        | Thumbs, Slider              | n/a                |
```

### Screenshots

![The menu](./react-src/docs/interaction-1.png)

![The slider](./react-src/docs/interaction-2.png)

![Thumbs](./react-src/docs/interaction-3.png)

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

### Performance - v0.0.6

1. Database queries were lifted up to the highest level. This way the minimum amount of queries are performed only.

```
| Query        | Old Component | New Component |
------------------------------------------------
| Categories   | Main          | Home          |
| Posts, Pages | Content       | Main          |
```

2. A new slider has to be added.

   - The current slider uses `scrollIntoView` which is a [working draft](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) and not compatible with Edge, Safari iOS and behaves differently on Chrome than in Firefox. Also `scrollTo` from the [original idea](https://nolanlawson.com/2019/02/10/building-a-modern-carousel-with-css-scroll-snap-smooth-scrolling-and-pinch-zoom/) is not fully compatible with all browsers.

   - On click on a slide the whole parent container (`<Content>`, ie. all slides) is re-rendered because `activeImage` state is kept there to be shared with `<Thumbs>`. The new slider has to take this as an advantage instead of a drawback.

3. A new slider was added: https://developers.google.com/web/updates/2018/07/css-scroll-snap

   - This uses `scrollBy` which has [full support](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy) for the features used.

   - It needs no `activeImage` for scrolling. This state can be eliminated therefore on slide click the `<Content>` is not re-rendered. In fact nothing gets rendered on scroll / click.

4. Props re-checked after the consistent changes above.

### Best practices checklist - v0.0.07

For now only the development version is tested. Once live, with a proper URL, another set of tests will be performed.

Sources used:

- https://frontendchecklist.io/
- https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/
