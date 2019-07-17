import React from "react";
import { storiesOf } from "@storybook/react";

import Thumbs from "./Thumbs";
import description from "./Thumbs.md";
import { PostsDefaultProps } from "../Posts";

storiesOf("Thumbs", module).add(
  "Overview",
  () => <Thumbs {...PostsDefaultProps} />,
  {
    notes: { markdown: description }
  }
);
