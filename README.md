# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

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
