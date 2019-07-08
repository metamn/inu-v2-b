import React from "react";
import { storiesOf } from "@storybook/react";

import Slider from "./Slider";
import description from "./Slider.md";

storiesOf("Slider", module).add("Overview", () => <Slider />, {
  notes: { markdown: description }
});
