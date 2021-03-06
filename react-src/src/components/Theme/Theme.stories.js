import React from "react";
import { storiesOf } from "@storybook/react";

import Theme from "./Theme";
import description from "./Theme.md";

const ThemeStory = () => {
  const { starterTheme } = Theme();
  const code = JSON.stringify(starterTheme, null, 2);
  return (
    <>
      <p>Creates a theme and makes it available for all the components.</p>
      <pre>
        <code>{code}</code>
      </pre>
    </>
  );
};

storiesOf("Theme", module).add("Overview", () => <ThemeStory />, {
  notes: { markdown: description }
});
