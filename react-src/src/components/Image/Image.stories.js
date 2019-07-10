import React from "react";
import { storiesOf } from "@storybook/react";

import Image from "./Image";
import description from "./Image.md";

storiesOf("Image", module).add("Plain default", () => <Image />, {
  notes: { markdown: description }
});
