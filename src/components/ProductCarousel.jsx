import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

/**
 * Horizontal snap carousel with arrows, drag-to-scroll and touch swipe.
 */
export default function ProductCarousel({ children, itemClass = "w-[78%] sm:w-[46%] lg:w-[31%] xl:w-[23.5%]", ariaLabel }) {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return; // native touch scrolling
    const el = ref.current;
    drag.current = { startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    el.scrollLeft = d.scrollLeft - dx;
  };
  const onPointerUp = (e) => {
    if (drag.current?.moved) {
      // Prevent the click that follows a drag from opening a product page.
      const el = ref.current;
      const stop = (ev) => { ev.preventDefault(); ev.stopPropagation(); el.removeEventListener("click", stop, true); };
      el.addEventListener("click", stop, true);
      setTimeout(() => el.removeEventListener("click", stop, true), 0);
    }
    drag.current = null;
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start ${itemClass}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous products"
          className="cursor-pointer border border-gray-200 p-3 text-ink transition-all hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next products"
          className="cursor-pointer border border-gray-200 p-3 text-ink transition-all hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
