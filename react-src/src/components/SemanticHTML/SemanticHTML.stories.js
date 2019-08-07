import React from "react";
import { storiesOf } from "@storybook/react";

import { Section } from "./SemanticHTML";
import description from "./SemanticHTML.md";

storiesOf("SemanticHTML", module).add(
  "Overview",
  () => (
    <Section elementName="section" title="Section">
      Section - a Semantic HTML5 element
    </Section>
  ),
  {
    notes: { markdown: description }
  }
);
