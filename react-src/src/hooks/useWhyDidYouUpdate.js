import { useRef, useEffect } from "react";

/**
 * Checks if there are too many re-renders
 *
 * @see https://gist.github.com/gragland/fe89992181663d5e46d024dec8a8e5e6#gistcomment-2845331
 */

const useWhyDidYouUpdate = (name, props) => {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      } else {
        // Otherwise let user know to use React.memo
        // The fact that this effect was called means component re-rendered
        console.log(
          "[why-did-you-update]",
          name,
          `Re-rendered without any prop changes. Use React.memo to avoid re-rendering.`
        );
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
};

export default useWhyDidYouUpdate;
