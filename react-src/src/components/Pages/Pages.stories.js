import React from "react";
import { storiesOf } from "@storybook/react";

import Pages, { PagesPropTypes, PagesDefaultProps } from "./Pages";
import description from "./Pages.md";

const PagesForStory = () => {
  const data = Pages();
  return <p>Loads Pages from the database.</p>;
};

PagesForStory.propTypes = PagesPropTypes;
PagesForStory.defaultProps = PagesDefaultProps;

storiesOf("Pages", module).add("Overview", () => <PagesForStory />, {
  notes: { markdown: description }
});
