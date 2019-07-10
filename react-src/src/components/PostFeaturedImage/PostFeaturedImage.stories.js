import React from "react";
import { storiesOf } from "@storybook/react";

import PostFeaturedImage from "./PostFeaturedImage";
import description from "./PostFeaturedImage.md";

storiesOf("PostFeaturedImage", module).add(
  "Overview",
  () => <PostFeaturedImage />,
  {
    notes: { markdown: description }
  }
);
