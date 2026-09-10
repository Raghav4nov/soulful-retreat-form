"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  Feather,
  Leaf,
  Lotus,
  Mountain,
  SingingBowl,
  Spiral,
  Sun,
  SunSalutation,
  Waves,
  Yogi,
} from "@/components/ui/icons";

type IconDef = {
  icon: ReactNode;
  className: string;
  size: number;
  duration: number;
  delay: number;
  yRange: number;
  rotateRange: number;
};

const ICONS: IconDef[] = [
  {
    icon: <Leaf />,
    className: "top-[8%] left-[6%] text-sage/75",
    size: 48,
    duration: 6,
    delay: 0,
    yRange: 16,
    rotateRange: 6,
  },
  {
    icon: <Sun />,
    className: "top-[10%] right-[8%] text-forest/60",
    size: 52,
    duration: 7,
    delay: 0.4,
    yRange: 14,
    rotateRange: 4,
  },
  {
    icon: <Spiral />,
    className: "top-[3%] left-[42%] text-sage/65",
    size: 34,
    duration: 6,
    delay: 0.9,
    yRange: 10,
    rotateRange: 8,
  },
  {
    icon: <Feather />,
    className: "top-[22%] left-[22%] text-sage/65 hidden lg:block",
    size: 46,
    duration: 8,
    delay: 1,
    yRange: 12,
    rotateRange: 5,
  },
  {
    icon: <Yogi />,
    className: "top-[42%] left-[4%] text-forest/55 hidden lg:block",
    size: 64,
    duration: 7.5,
    delay: 0.5,
    yRange: 16,
    rotateRange: 3,
  },
  {
    icon: <Spiral />,
    className: "top-[30%] right-[22%] text-forest/55 hidden lg:block",
    size: 44,
    duration: 6.5,
    delay: 1.6,
    yRange: 10,
    rotateRange: 8,
  },
  {
    icon: <Waves />,
    className: "top-[55%] right-[6%] text-sage/75 hidden sm:block",
    size: 56,
    duration: 5.5,
    delay: 0.8,
    yRange: 10,
    rotateRange: 0,
  },
  {
    icon: <Mountain />,
    className: "bottom-[14%] left-[8%] text-sage/75",
    size: 50,
    duration: 8.5,
    delay: 0.3,
    yRange: 14,
    rotateRange: 2,
  },
  {
    icon: <Waves />,
    className: "bottom-[4%] right-[36%] text-sage/75",
    size: 34,
    duration: 5.5,
    delay: 0.7,
    yRange: 8,
    rotateRange: 0,
  },
  {
    icon: <Lotus />,
    className: "top-[68%] left-[18%] text-forest/55 hidden lg:block",
    size: 44,
    duration: 6,
    delay: 1.4,
    yRange: 12,
    rotateRange: 4,
  },
  {
    icon: <Lotus />,
    className: "bottom-[8%] right-[7%] text-forest/60",
    size: 52,
    duration: 7,
    delay: 1.2,
    yRange: 16,
    rotateRange: 5,
  },
  {
    icon: <Sun />,
    className: "bottom-[16%] left-[38%] text-sage/65 hidden sm:block",
    size: 40,
    duration: 6.5,
    delay: 0.6,
    yRange: 10,
    rotateRange: 3,
  },
  {
    icon: <SingingBowl />,
    className: "top-[45%] right-[9%] text-forest/55 hidden lg:block",
    size: 46,
    duration: 7,
    delay: 1.1,
    yRange: 12,
    rotateRange: 4,
  },
  {
    icon: <SingingBowl />,
    className: "bottom-[28%] right-[20%] text-sage/65 hidden lg:block",
    size: 36,
    duration: 6,
    delay: 0.5,
    yRange: 10,
    rotateRange: 3,
  },
  {
    icon: <SunSalutation />,
    className: "top-[65%] left-[6%] text-forest/55 hidden lg:block",
    size: 50,
    duration: 7.5,
    delay: 0.9,
    yRange: 14,
    rotateRange: 3,
  },
  {
    icon: <SunSalutation />,
    className: "top-[14%] right-[32%] text-sage/65 hidden lg:block",
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
