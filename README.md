# inu-v2-b

A photo portfolio theme with React, WPGraphQL and Create React WPTheme.

## Development process

Based on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).

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
