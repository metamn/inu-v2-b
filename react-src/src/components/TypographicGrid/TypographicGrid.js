import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Repeat from "../Repeat";

/**
 * Defines the component prop types
 */
const propTypes = {
  /**
   * Display vertical rhythm lines?
   */
  displayVerticalRhytm: PropTypes.bool,
  /**
   * Display horizontal rhythm lines?
   */
  displayHorizontalRhytm: PropTypes.bool,
  /**
   * The number of horizontal rhythm lines
   */
  numberOfHorizontalLines: PropTypes.number,
  /**
   * The number of vertical rhythm lines
   */
  numberOfVerticalLines: PropTypes.number,
  /**
   * The color of the rhythm lines
   */
  lineColor: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  displayVerticalRhytm: false,
  displayHorizontalRhytm: false,
  numberOfHorizontalLines: 100,
  numberOfVerticalLines: 100,
  lineColor: "gray"
};

/**
 * Sets up the typographic grid
 *
 * It's hand coded since `createGlobalStyle` doesn't supports yet object notation
 */
const GlobalStyle = createGlobalStyle`
	body {
		font-size: 100%;
	    line-height: 1.25;
	    --lem: 1.25em;
	}
`;

/**
 * Styles the rhythm containers
 */
const Rhythm = styled("div")([], {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
});

/**
 * Styles the vertical rhythm container
 */
const VerticalRhythm = styled(Rhythm)(props => ({
  display: props.displayVerticalRhytm ? "flex" : "none",
  flexWrap: "wrap"
}));

/**
 * Styles the horizontal rhythm container
 */
const HorizontalRhythm = styled(Rhythm)(props => ({
  display: props.displayHorizontalRhytm ? "flex" : "none",
  flexWrap: "wrap"
}));

/**
 * Styles the rhythm lines
 */
const Line = styled.div(props => ({
  boxSizing: "border-box",
  borderColor: props.lineColor ? props.lineColor : "transparent",
  borderWidth: "1px"
}));

/**
 * Styles the vertical rhythm line
 */
const VerticalRhythmLine = styled(Line)([], {
  width: "var(--lem)",
  height: "100%",
  borderRightStyle: "solid"
});

/**
 * Styles the horizontal rhythm line
 */
const HorizontalRhythmLine = styled(Line)([], {
  width: "100%",
  height: "var(--lem)",
  borderBottomStyle: "solid"
});

/**
 * Styles the main container
 */
const Container = styled.div([]);

/**
 * Displays horizontal and vertical lines across the page.
 *
 * It helps to verify elements are all perfectly aligned to the grid.
 *
 * @see http://metamn.io/mr-ui
 */
const TypographicGrid = props => {
  const {
    displayVerticalRhytm,
    displayHorizontalRhytm,
    numberOfHorizontalLines,
    numberOfVerticalLines,
    lineColor
  } = props;

  return (
    <>
      <GlobalStyle />
      {(displayHorizontalRhytm || displayVerticalRhytm) && (
        <Container className="typographic-grid">
          {displayHorizontalRhytm && (
            <HorizontalRhythm
              className="horizontal-lines"
              displayHorizontalRhytm={displayHorizontalRhytm}
            >
              <Repeat numberOfTimes={numberOfHorizontalLines} startAt={0}>
                {i => <HorizontalRhythmLine key={i} lineColor={lineColor} />}
              </Repeat>
            </HorizontalRhythm>
          )}
          {displayVerticalRhytm && (
            <VerticalRhythm
              className="vertical-lines"
              displayVerticalRhytm={displayVerticalRhytm}
            >
              <Repeat numberOfTimes={numberOfVerticalLines} startAt={0}>
                {i => <VerticalRhythmLine key={i} lineColor={lineColor} />}
              </Repeat>
            </VerticalRhythm>
          )}
        </Container>
      )}
    </>
  );
};

TypographicGrid.propTypes = propTypes;
TypographicGrid.defaultProps = defaultProps;

export default React.memo(TypographicGrid);
