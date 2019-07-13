import { useState } from "react";

/**
 * Syncs state to local storage so that it persists through a page refresh
 * From https://usehooks.com/useLocalStorage/
 *
 * Example:
 * ```
 * useLocalStorage("test-key", "xxx")
 * ```
 *
 * @param  String key          The local storage key / ID
 * @param  String initialValue The initial value
 * @return String              The value from local storage
 */
function useLocalStorage(key, initialValue) {
  /**
   * State to store the value
   * Pass initial state function to useState so logic is only executed once
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      /**
       * Get from local storage by key
       */
      const item = window.localStorage.getItem(key);

      /**
       * Parse stored json or if none return initialValue
       */
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      /**
       * If error also return initialValue
       */
      console.log("useLocalStorage error:" + error);
      return initialValue;
    }
  });

  /**
   * Return a wrapped version of useState's setter function that persists the new value to localStorage.
   *
   * @param String value The value
   */
  const setValue = value => {
    try {
      /**
       * Allow value to be a function so we have same API as useState
       */
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      /**
       * Save state
       */
      setStoredValue(valueToStore);

      /**
       * Save to local storage
       */
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log("useLocalStorage / setValue rror:" + error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
