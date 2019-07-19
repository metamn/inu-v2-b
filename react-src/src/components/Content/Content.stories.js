import React from "react";
import { storiesOf } from "@storybook/react";

import Content from "./Content";
import description from "./Content.md";

storiesOf("Content", module)
  .add("With default props", () => <Content />, {
    notes: { markdown: description }
  })
  .add("With thumbs", () => <Content activeContentDisplayMode="thumbs" />, {
    notes: { markdown: description }
  });
