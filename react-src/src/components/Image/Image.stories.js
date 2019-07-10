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
    "With srcset",
    () => (
      <Image
        src="http://metamn.io/assets/images/beat-home-mobile_laptop.png"
        srcset="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w"
      />
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
  )
  .add(
    "Progressive, with srcset",
    () => (
      <Image
        src="http://metamn.io/assets/images/beat-home-mobile_laptop.png"
        srcset="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w"
        isProgressive={true}
      />
    ),
    {
      notes: { markdown: description }
    }
  );
