"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type IconDef = {
  icon: ReactNode;
  className: string;
  size: number;
  duration: number;
  delay: number;
  yRange: number;
  rotateRange: number;
};

function Leaf() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 52C12 30 30 12 52 12C52 34 34 52 12 52Z" />
      <path d="M14 50C24 40 34 30 50 14" />
    </svg>
  );
}

function Lotus() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 46C24 36 24 20 32 10C40 20 40 36 32 46Z" />
      <path d="M32 46C18 42 8 30 8 18C22 18 30 28 32 46Z" />
      <path d="M32 46C46 42 56 30 56 18C42 18 34 28 32 46Z" />
      <path d="M14 50C20 44 26 42 32 46C38 42 44 44 50 50" />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="32" cy="32" r="11" />
      <path d="M32 6V14M32 50V58M6 32H14M50 32H58M13 13L18.5 18.5M45.5 45.5L51 51M51 13L45.5 18.5M18.5 45.5L13 51" />
    </svg>
  );
}

function Mountain() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 48L22 22L32 36L42 18L58 48Z" />
      <circle cx="48" cy="14" r="4" />
    </svg>
  );
}

function Yogi() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="14" r="6" />
      <path d="M32 20V28" />
      <path d="M14 50C14 36 22 28 32 28C42 28 50 36 50 50" />
      <path d="M14 50H50" />
      <path d="M24 34C20 38 18 44 18 50" />
      <path d="M40 34C44 38 46 44 46 50" />
    </svg>
  );
}

function Waves() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M8 40C16 30 24 30 32 40C40 50 48 50 56 40" />
      <path d="M8 28C16 18 24 18 32 28C40 38 48 38 56 28" />
    </svg>
  );
}

function Spiral() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M32 32C32 28 35 26 38 27C42 28 44 32 42 36C40 41 34 43 29 40C23 37 21 30 25 24C29 18 38 16 45 21C53 26 56 36 51 45" />
    </svg>
  );
}

function Feather() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 8C30 8 16 22 16 42C16 48 18 52 18 52" />
      <path d="M42 12L18 36" />
      <path d="M38 16L22 32" />
      <path d="M34 20L26 28" />
      <path d="M12 56L20 48" />
    </svg>
  );
}

function SingingBowl() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 40C12 49 20.5 54 32 54C43.5 54 52 49 52 40" />
      <path d="M8 40H56" />
      <path d="M22 14C26 10 38 10 42 14" />
      <path d="M18 22C23 16 41 16 46 22" />
      <path d="M28 32L44 22" />
      <circle cx="46" cy="20.5" r="2.5" />
    </svg>
  );
}

function SunSalutation() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="12" r="6" />
      <path d="M32 18V38" />
      <path d="M32 22L16 8" />
      <path d="M32 22L48 8" />
      <path d="M32 38L20 56" />
      <path d="M32 38L44 56" />
    </svg>
  );
}

const ICONS: IconDef[] = [
  {
    icon: <Leaf />,
    className: "top-[8%] left-[6%] text-sage/55",
    size: 48,
    duration: 6,
    delay: 0,
    yRange: 16,
    rotateRange: 6,
  },
  {
    icon: <Sun />,
    className: "top-[10%] right-[8%] text-forest/40",
    size: 52,
    duration: 7,
    delay: 0.4,
    yRange: 14,
    rotateRange: 4,
  },
  {
    icon: <Spiral />,
    className: "top-[3%] left-[42%] text-sage/45",
    size: 34,
    duration: 6,
    delay: 0.9,
    yRange: 10,
    rotateRange: 8,
  },
  {
    icon: <Feather />,
    className: "top-[22%] left-[22%] text-sage/45 hidden lg:block",
    size: 46,
    duration: 8,
    delay: 1,
    yRange: 12,
    rotateRange: 5,
  },
  {
    icon: <Yogi />,
    className: "top-[42%] left-[4%] text-forest/35 hidden lg:block",
    size: 64,
    duration: 7.5,
    delay: 0.5,
    yRange: 16,
    rotateRange: 3,
  },
  {
    icon: <Spiral />,
    className: "top-[30%] right-[22%] text-forest/35 hidden lg:block",
    size: 44,
    duration: 6.5,
    delay: 1.6,
    yRange: 10,
    rotateRange: 8,
  },
  {
    icon: <Waves />,
    className: "top-[55%] right-[6%] text-sage/55 hidden sm:block",
    size: 56,
    duration: 5.5,
    delay: 0.8,
    yRange: 10,
    rotateRange: 0,
  },
  {
    icon: <Mountain />,
    className: "bottom-[14%] left-[8%] text-sage/55",
    size: 50,
    duration: 8.5,
    delay: 0.3,
    yRange: 14,
    rotateRange: 2,
  },
  {
    icon: <Waves />,
    className: "bottom-[4%] right-[36%] text-sage/55",
    size: 34,
    duration: 5.5,
    delay: 0.7,
    yRange: 8,
    rotateRange: 0,
  },
  {
    icon: <Lotus />,
    className: "top-[68%] left-[18%] text-forest/35 hidden lg:block",
    size: 44,
    duration: 6,
    delay: 1.4,
    yRange: 12,
    rotateRange: 4,
  },
  {
    icon: <Lotus />,
    className: "bottom-[8%] right-[7%] text-forest/40",
    size: 52,
    duration: 7,
    delay: 1.2,
    yRange: 16,
    rotateRange: 5,
  },
  {
    icon: <Sun />,
    className: "bottom-[16%] left-[38%] text-sage/45 hidden sm:block",
    size: 40,
    duration: 6.5,
    delay: 0.6,
    yRange: 10,
    rotateRange: 3,
  },
  {
    icon: <SingingBowl />,
    className: "top-[45%] right-[9%] text-forest/35 hidden lg:block",
    size: 46,
    duration: 7,
    delay: 1.1,
    yRange: 12,
    rotateRange: 4,
  },
  {
    icon: <SingingBowl />,
    className: "bottom-[28%] right-[20%] text-sage/45 hidden lg:block",
    size: 36,
    duration: 6,
    delay: 0.5,
    yRange: 10,
    rotateRange: 3,
  },
  {
    icon: <SunSalutation />,
    className: "top-[65%] left-[6%] text-forest/35 hidden lg:block",
    size: 50,
    duration: 7.5,
    delay: 0.9,
    yRange: 14,
    rotateRange: 3,
  },
  {
    icon: <SunSalutation />,
    className: "top-[14%] right-[32%] text-sage/45 hidden lg:block",
    size: 38,
    duration: 6.5,
    delay: 1.3,
    yRange: 12,
    rotateRange: 4,
  },
];

export default function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {ICONS.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.className}`}
          style={{ width: item.size, height: item.size }}
          animate={{
            y: [0, -item.yRange, 0],
            rotate: item.rotateRange ? [0, item.rotateRange, 0] : 0,
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
