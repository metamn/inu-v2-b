import React from "react";
import { storiesOf } from "@storybook/react";

import Image from "./Image";
import description from "./Image.md";

storiesOf("Image", module)
  .add("With empty props", () => <Image />, {
    notes: { markdown: description }
  })
  .add(
    "With a real URL",
    () => (
      <Image src="http://metamn.io/assets/images/avatar-kubist_desktop.png" />
    ),
    {
      notes: { markdown: description }
    }
  )
  .add(
    "With real URL and dimensions set",
    () => (
      <Image
        src="http://metamn.io/assets/images/avatar-kubist_desktop.png"
        width="300"
        height="300"
      />
    ),
    {
      notes: { markdown: description }
    }
  )
  .add(
    "With click from context",
    () => (
      <Image
        src="http://metamn.io/assets/images/avatar-kubist_desktop.png"
        width="300"
        height="300"
      />
    ),
    {
      notes: { markdown: description }
    }
  );
