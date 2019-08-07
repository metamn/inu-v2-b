import React from "react";
import { storiesOf } from "@storybook/react";

import { Section } from "./SemanticHTML";
import description from "./SemanticHTML.md";

storiesOf("SemanticHTML", module).add(
  "Overview",
  () => (
    <Section elementName="section" title="Section">
      Displays a "section", "article", "aside", "nav" Semantic HTML5 element.
      For example:
      <pre>
        <code>
          {`
			<section>
				<h3 class="title sc-jTzLTM gLmtYF">Section</h3>
				Displays a "section" Semantic HTML5 element
			</section>
			`}
        </code>
      </pre>
    </Section>
  ),
  {
    notes: { markdown: description }
  }
);
