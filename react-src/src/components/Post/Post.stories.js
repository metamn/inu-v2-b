import React from "react";
import { storiesOf } from "@storybook/react";

import Post from "./Post";
import description from "./Post.md";

/**
 * Displays a real image.
 * The default image will have visibility set to 0 so we can't use it here...
 */
const defaultProps = {
  id: "1",
  title: "Post",
  index: 1,
  featuredImageTitle: "Featured image",
  featuredImageType: "large",
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

storiesOf("Post", module).add("Overview", () => <Post {...defaultProps} />, {
  notes: { markdown: description }
});
