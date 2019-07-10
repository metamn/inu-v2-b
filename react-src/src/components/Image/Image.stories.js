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
  .add("Progressive, with empty props", () => <Image isProgressive={true} />, {
    notes: { markdown: description }
  })
  .add(
    "Progressive, with a real URL",
    () => (
      <Image
        src="http://metamn.io/assets/images/avatar-kubist_desktop.png"
        isProgressive={true}
      />
    ),
    {
      notes: { markdown: description }
    }
  );
