import React from "react";
import { storiesOf } from "@storybook/react";

import Content from "./Content";
import description from "./Content.md";

storiesOf("Content", module)
  .add("Overview", () => <Content />, {
    notes: { markdown: description }
  })
  .add("With thumbs", () => <Content activeContentDisplayMode="thumbs" />, {
    notes: { markdown: description }
  })
  .add("With page", () => <Content activeContentDisplayMode="page" />, {
    notes: { markdown: description }
  })
  .add("With blank", () => <Content activeContentDisplayMode="blank" />, {
    notes: { markdown: description }
  });
