import React from "react";
import { storiesOf } from "@storybook/react";

import Slides from "./Slides";
import description from "./Slides.md";
import { SliderDefaultProps } from "../Slider";
import { PostsDefaultProps } from "../Posts";

storiesOf("Slides", module).add(
  "Overview",
  () => {
    const { refs, slidesRendered } = Slides({
      activeImage: 1,
      ...PostsDefaultProps
    });
    return <>{slidesRendered}</>;
  },
  {
    notes: { markdown: description }
  }
);
