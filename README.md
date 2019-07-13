# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

### Interaction - v0.0.3

1. Go through each component which is handling interactive elements and implement their functionality with states.
   1. Try to `useContext` to pass variables needed for state management instead of props.
2. Lift states to assure the whole app is working in sync.
3. Check the performance.
   1. Display a log message when a data component is rendered.
   2. If there are more than two renders (first with default props, then with real data) the case should be investigated.
   3. Add `useWhyDidYouUpdate` to all data components to tell what needs to be memoized

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
