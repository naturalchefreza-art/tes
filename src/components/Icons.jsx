// Minimal inline icon set (lucide-style strokes) — avoids an icon package dependency.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ size = 20, children, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      {children}
    </svg>
  );
}

export const Search = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Svg>
);
export const Heart = (p) => (
  <Svg {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Svg>
);
export const Bag = (p) => (
  <Svg {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Svg>
);
export const Phone = (p) => (
  <Svg {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </Svg>
);
export const Mail = (p) => (
  <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>
);
export const User = (p) => (
  <Svg {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>
);
export const Menu = (p) => (<Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>);
export const X = (p) => (<Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>);
export const ChevronLeft = (p) => (<Svg {...p}><path d="m15 18-6-6 6-6" /></Svg>);
export const ChevronRight = (p) => (<Svg {...p}><path d="m9 18 6-6-6-6" /></Svg>);
export const ChevronDown = (p) => (<Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>);
export const Plus = (p) => (<Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>);
export const Minus = (p) => (<Svg {...p}><path d="M5 12h14" /></Svg>);
export const Trash = (p) => (
  <Svg {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></Svg>
);
export const ArrowRight = (p) => (
  <Svg {...p}><path d="M5 12h14m-6-7 7 7-7 7" /></Svg>
);
export const Check = (p) => (<Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>);
export const Truck = (p) => (
  <Svg {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9m10 0h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
  </Svg>
);
export const Return = (p) => (
  <Svg {...p}><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-15-6.7L3 13" /></Svg>
);
export const Shield = (p) => (
  <Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></Svg>
);
export const Headset = (p) => (
  <Svg {...p}>
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm18 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z" />
    <path d="M21 11a9 9 0 0 0-18 0" /><path d="M21 16v1a3 3 0 0 1-3 3h-5" />
  </Svg>
);
export const Wifi = (p) => (
  <Svg {...p}><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0" /><circle cx="12" cy="20" r="1" /></Svg>
);
export const Battery = (p) => (
  <Svg {...p}>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2M6.5 10.5h4M8.5 13.5h5" />
  </Svg>
);
export const Filter = (p) => (
  <Svg {...p}><path d="M3 5h18M6 12h12M10 19h4" /></Svg>
);
export const Clock = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
);
export const Pin = (p) => (
  <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);
export const Key = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m11 12 9-9m-3 3 2 2m-4-4 2 2" />
  </Svg>
);
export const Sparkle = (p) => (
  <Svg {...p}><path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8M8.4 15.6l-2.8 2.8" /></Svg>
);
