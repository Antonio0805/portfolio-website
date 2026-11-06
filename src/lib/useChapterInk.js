import { useCallback, useEffect, useState } from "react";

// Reads the chapter colour under the fixed header (`data-chapter` on the
// section beneath its middle line), so the header can take that chapter's ink.
export function useChapterInk(probeY = 36, deps = []) {
  const [chapter, setChapter] = useState("ink");

  const read = useCallback(() => {
    const stack = document.elementsFromPoint(window.innerWidth / 2, probeY);
    for (const element of stack) {
      if (element.closest(".nav, .curtain, .cursor, .menu")) {
        continue;
      }
      const section = element.closest("[data-chapter]");
      if (section) {
        setChapter(section.dataset.chapter);
        return;
      }
    }
  }, [probeY]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(read);
    };

    schedule();
    // A new page arrives after the old one has faded out (about 250ms) and then
    // settles; read again as it appears and once it has come to rest.
    const settles = [300, 650, 1000].map((ms) => setTimeout(schedule, ms));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      settles.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [read, ...deps]);

  return chapter;
}
