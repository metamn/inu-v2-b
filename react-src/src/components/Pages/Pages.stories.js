import React from "react";
import { storiesOf } from "@storybook/react";

import Pages, { PagesPropTypes, PagesDefaultProps } from "./Pages";
import description from "./Pages.md";

const PagesForStory = () => {
  const data = Pages({});
  const code = JSON.stringify(data, null, 2);
  return (
    <>
      <p>Loads Pages from the database</p>
      <pre>
        <code>{code}</code>
      </pre>
    </>
  );
};

PagesForStory.propTypes = PagesPropTypes;
PagesForStory.defaultProps = PagesDefaultProps;

storiesOf("Pages", module).add("Overview", () => <PagesForStory />, {
  notes: { markdown: description }
});
