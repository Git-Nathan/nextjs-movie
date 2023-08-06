import { RefObject, useEffect } from "react";

export function useClickOutside(ref: RefObject<any>, callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
