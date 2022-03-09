import { useCallback, useEffect, useRef } from "react";

/**
 * Very basic debounce function implementation
 * @param {function} callback
 * @param {number} wait
 * @returns debounced callback
 */
const useDebouncedCallback = (callback, wait) => {
  const timeout = useRef();

  const cleanup = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => {
    cleanup();
  }, []);

  const debouncedCallback = useCallback(
    (...args) => {
      // clear debounce timer
      cleanup();

      // start waiting again
      timeout.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [wait, cleanup, callback]
  );

  return debouncedCallback;
};

export default useDebouncedCallback;
