import React from "react";
import { storiesOf } from "@storybook/react";

import PostFeaturedImage from "./PostFeaturedImage";
import description from "./PostFeaturedImage.md";

storiesOf("PostFeaturedImage", module)
  .add("With no props (large as default)", () => <PostFeaturedImage />, {
    notes: { markdown: description }
  })
  .add(
    "As thumbnail",
    () => <PostFeaturedImage featuredImageType="thumbnail" />,
    {
      notes: { markdown: description }
    }
  );
