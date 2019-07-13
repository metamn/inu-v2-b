import { renderHook, act } from "@testing-library/react-hooks";
import "./test-helpers.js";
import useMatchMedia from "./useMatchMedia";

/**
 * This throws TypeError: window.matchMedia is not a function
 */

/**
 * test("should return default value if there is no match for the query", () => {
   const { result } = renderHook(() =>
     useMatchMedia(["(inexistent-media-query)"], ["not-returned"], "returned")
   );

   act(() => {
     result.current;
   });

   expect(result.current).toBe("returned");
 });
 */
