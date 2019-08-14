import React from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

/**
 * Defines a global reset with `normalize.css`.
 *
 * Adds custom resets.
 */
const GlobalReset = createGlobalStyle`
	${normalize()}

	body {
		// Grid reset
		//
		box-sizing: border-box;

		*,
		*::before,
		*::after {
			box-sizing: inherit;
		}

		// Typography reset on top of Normalize.css
		//
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-size: 1em;
			font-weight: normal;
			margin: 0;
			padding: 0;
		}

		p,
		figure,
		blockquote,
		ul,
		ol,
		li {
			margin: 0;
			padding: 0;
		}

		// Remove the extra bottom spacing for <img> inside <a>
		// unfortunatelly in WP it breaks the figcaption ...
		figure a {
			line-height: 0;
			display: inline-block;
		}

		a {
			word-wrap: break-word;
		}

		// https://stackoverflow.com/questions/17838607/making-an-iframe-responsive
		iframe,
		object,
		embed {
			max-width: 100%;
		}

		button {
			-webkit-appearance: none;
    		-moz-appearance: none;
			background: transparent;
			border: none;
			outline: none;
			padding: 0;

			 &:hover,
			 &:focus,
			 &:active {
				 border: none;
				 box-shadow: none;
			 }
		}
	}
`;

/**
 * Resets the browser
 */
const Reset = () => {
  return <GlobalReset />;
};

export default React.memo(Reset);
