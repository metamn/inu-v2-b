import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

test("should store value in localstorage", () => {
  const { result } = renderHook(() => useLocalStorage("test-key", "xxx"));

  act(() => {
    result.current;
  });

  expect(result.current[0]).toBe("xxx");
});

test("should set value in localstorage", () => {
  const { result } = renderHook(() => useLocalStorage("test-key", "yyy"));

  act(() => {
    result.current[1]("zzz");
  });

  expect(result.current[0]).toBe("zzz");
});
