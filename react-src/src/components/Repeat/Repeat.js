import PropTypes from "prop-types";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * How many times to repeat?
   */
  numberOfTimes: PropTypes.number.isRequired,
  /**
   * Start from this number
   */
  startAt: PropTypes.number,
  /**
   * Returns this element
   */
  children: PropTypes.func.isRequired
};

/**
 * Defines the default props
 */
const defaultProps = {
  numberOfTimes: 1,
  startAt: 0,
  children: () => {}
};

/**
 * Imitates the for loop inside JSX.
 *
 * @see: https://reactjs.org/docs/jsx-in-depth.html
 */
const Repeat = props => {
  const { startAt, numberOfTimes, children } = props;

  let ret = [];
  const endAt = startAt + numberOfTimes;

  for (let i = startAt; i < endAt; i++) {
    ret.push(children(i));
  }

  return ret;
};

Repeat.propTypes = propTypes;
Repeat.defaultProps = defaultProps;

export default Repeat;
