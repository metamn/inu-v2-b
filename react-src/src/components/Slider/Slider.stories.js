import React from "react";
import { storiesOf } from "@storybook/react";

import Slider from "./Slider";
import description from "./Slider.md";
import { PostsDefaultProps } from "../Posts";

storiesOf("Slider", module).add(
  "Overview",
  () => <Slider {...PostsDefaultProps} />,
  {
    notes: { markdown: description }
  }
);
