import React from "react";
import { storiesOf } from "@storybook/react";

import Slides from "./Slides";
import { SliderDefaultProps } from "../Slider";
import description from "./Slides.md";

storiesOf("Slides", module).add(
  "Overview",
  () => {
    const [ref, slidesRendered] = Slides(SliderDefaultProps);
    return <>{slidesRendered}</>;
  },
  {
    notes: { markdown: description }
  }
);
