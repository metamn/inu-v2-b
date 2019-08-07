import React from "react";
import { storiesOf } from "@storybook/react";

import PostFeaturedImage from "./PostFeaturedImage";
import description from "./PostFeaturedImage.md";

/**
 * Displays a real image.
 * The default image will have visibility set to 0 so we can't use it here...
 */
const defaultProps = {
  featuredImageTitle: "Featured image",
  featuredImageType: "large",
  index: 1,
  featuredImage: {
    id: "YXR0YWNobWVudDozMw==",
    sourceUrl: "http://www.inu.ro/wp-content/uploads/2012/06/bogdan1.jpg",
    mediaDetails: {
      file: "2012/06/bogdan1.jpg",
      height: 450,
      width: 700,
      sizes: [
        {
          file: "bogdan1-150x150.jpg",
          height: "150",
          mimeType: null,
          name: "thumbnail",
          sourceUrl:
            "http://www.inu.ro/wp-content/uploads/2012/06/bogdan1-150x150.jpg",
          width: "150"
        },
        {
          file: "bogdan1-300x192.jpg",
          height: "192",
          mimeType: null,
          name: "medium",
          sourceUrl:
            "http://www.inu.ro/wp-content/uploads/2012/06/bogdan1-300x192.jpg",
          width: "300"
        }
      ]
    }
  }
};

storiesOf("PostFeaturedImage", module)
  .add("Large (default)", () => <PostFeaturedImage {...defaultProps} />, {
    notes: { markdown: description }
  })
  .add(
    "As thumbnail",
    () => <PostFeaturedImage {...defaultProps} featuredImageType="thumbnail" />,
    {
      notes: { markdown: description }
    }
  );
