import React from "react";
import { storiesOf } from "@storybook/react";

import Slides from "./Slides";
import description from "./Slides.md";
import { PostsDefaultProps } from "../Posts";

storiesOf("Slides", module).add(
  "Overview",
  () => <Slides {...PostsDefaultProps} />,
  {
    notes: { markdown: description }
  }
);
