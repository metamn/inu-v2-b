import React from "react";
import { storiesOf } from "@storybook/react";

import Content from "./Content";
import description from "./Content.md";

storiesOf("Content", module)
  .add("Default, displaying the slider", () => <Content />, {
    notes: { markdown: description }
  })
  .add(
    "Displaying thumbs",
    () => <Content activeContentDisplayMode="thumbs" />,
    {
      notes: { markdown: description }
    }
  )
  .add("Displaying page", () => <Content activeContentDisplayMode="page" />, {
    notes: { markdown: description }
  })
  .add(
    "Displaying blank (nothing)",
    () => <Content activeContentDisplayMode="blank" />,
    {
      notes: { markdown: description }
    }
  );
