import { useEffect, useRef, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

/** Rolling countdown — target set once on mount, 4 days 11 hours out. */
export default function CountdownTimer() {
  const targetRef = useRef(null);
  if (targetRef.current === null) {
    targetRef.current = Date.now() + (4 * 24 + 11) * 3600 * 1000 + 42 * 60 * 1000;
  }
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, targetRef.current - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const cells = [
    { v: pad(d), label: "Days" },
    { v: pad(h), label: "Hours" },
    { v: pad(m), label: "Minutes" },
    { v: pad(s), label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4" role="timer" aria-label="Deal countdown">
      {cells.map((c) => (
        <div key={c.label} className="min-w-[64px] flex-1 bg-charcoal px-2 py-3 text-center sm:min-w-[76px]">
          <div className="text-2xl font-bold tabular-nums text-accent sm:text-3xl">{c.v}</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
