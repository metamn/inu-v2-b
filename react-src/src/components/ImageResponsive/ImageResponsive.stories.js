import React from "react";
import { storiesOf } from "@storybook/react";

import ImageResponsive from "./ImageResponsive";
import description from "./ImageResponsive.md";

storiesOf("ImageResponsive", module)
  .add("With empty props", () => <ImageResponsive />, {
    notes: { markdown: description }
  })
  .add(
    "With empty props, not progressive",
    () => <ImageResponsive isProgressive={false} />,
    {
      notes: { markdown: description }
    }
  )
  .add(
    "With real URL",
    () => (
      <ImageResponsive src="http://metamn.io/assets/images/avatar-kubist_desktop.png" />
    ),
    {
      notes: { markdown: description }
    }
  )
  .add(
    "With srcset",
    () => (
      <ImageResponsive
        src="http://metamn.io/assets/images/beat-home-mobile_laptop.png"
        srcSet="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w"
      />
    ),
    {
      notes: { markdown: description }
    }
  )
  .add(
    "Progressive, with srcset, srcSetWidths and delay",
    () => (
      <ImageResponsive
        src="http://metamn.io/assets/images/beat-home-mobile_laptop.png"
        srcSet="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w"
        delay={3000}
        srcSetWidths={["150", "306", "525", "622", "898"]}
      />
    ),
    {
      notes: { markdown: description }
    }
  );
