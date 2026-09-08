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

const ICONS: IconDef[] = [
  {
    icon: <Leaf />,
    className: "top-[8%] left-[6%] text-sage/40",
    size: 48,
    duration: 14,
    delay: 0,
    yRange: 12,
    rotateRange: 6,
  },
  {
    icon: <Sun />,
    className: "top-[10%] right-[8%] text-forest/25 hidden sm:block",
    size: 60,
    duration: 18,
    delay: 1,
    yRange: 10,
    rotateRange: 4,
  },
  {
    icon: <Yogi />,
    className: "top-[42%] left-[4%] text-forest/20 hidden lg:block",
    size: 64,
    duration: 16,
    delay: 0.5,
    yRange: 14,
    rotateRange: 3,
  },
  {
    icon: <Waves />,
    className: "top-[55%] right-[6%] text-sage/40 hidden sm:block",
    size: 56,
    duration: 12,
    delay: 0.8,
    yRange: 8,
    rotateRange: 0,
  },
  {
    icon: <Mountain />,
    className: "bottom-[12%] left-[8%] text-sage/40 hidden sm:block",
    size: 58,
    duration: 20,
    delay: 0.3,
    yRange: 10,
    rotateRange: 2,
  },
  {
    icon: <Lotus />,
    className: "bottom-[8%] right-[7%] text-forest/25",
    size: 52,
    duration: 15,
    delay: 1.2,
    yRange: 12,
    rotateRange: 5,
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
