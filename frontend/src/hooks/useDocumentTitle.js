import { useEffect } from "react";

/** Sets document.title while mounted, restoring the previous value on unmount. */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
