import { useState } from "react";

// True on a mouse or trackpad; false on touch screens.
export function useFinePointer() {
  const [fine] = useState(() => {
    try {
      return window.matchMedia("(pointer: fine)").matches;
    } catch {
      return false;
    }
  });
  return fine;
}
