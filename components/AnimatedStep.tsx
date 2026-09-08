"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function AnimatedStep({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
