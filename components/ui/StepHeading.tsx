import type { ReactNode } from "react";

export function StepHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-playfair text-2xl leading-snug text-forest sm:text-3xl">
      {children}
    </h2>
  );
}

export function StepIntro({ children }: { children: ReactNode }) {
  return (
    <p className="font-cormorant mt-3 text-lg italic text-sage sm:text-xl">
      {children}
    </p>
  );
}
