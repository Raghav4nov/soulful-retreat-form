"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import BackgroundDecor from "@/components/ui/BackgroundDecor";
import {
  Bonfire,
  Feather,
  Mountain,
  SingingBowl,
  Spiral,
  SunSalutation,
} from "@/components/ui/icons";
import { INTENTION_OPTIONS } from "@/schema/options";

const EXPERIENCES = [
  {
    icon: <SunSalutation />,
    title: "Yoga & meditation",
    description: "Gentle morning practice to ground the body and quiet the mind.",
  },
  {
    icon: <SingingBowl />,
    title: "Sound healing",
    description: "Let singing bowls and resonant tones carry the tension out.",
  },
  {
    icon: <Mountain />,
    title: "Hiking & nature walks",
    description: "Wander quiet trails through the hills above the Ganges.",
  },
  {
    icon: <Bonfire />,
    title: "Bonfire & community circles",
    description: "Stories, silence, and good company under an open sky.",
  },
  {
    icon: <Feather />,
    title: "Journaling & reflection",
    description: "Space to put down what you've been carrying.",
  },
  {
    icon: <Spiral />,
    title: "Silence & stillness",
    description: "Nothing to do, nowhere to be — just this moment.",
  },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-full">
      <BackgroundDecor />

      <header className="sticky top-0 z-20 border-b border-sage/20 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo markSize={34} className="text-sm sm:text-base" />
          <Link
            href="/registration"
            className="rounded-full bg-forest px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3 sm:text-sm"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <Logo showWordmark={false} markSize={72} />
          <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage-deep">
            RISHIKESH · 14&ndash;15 NOVEMBER 2026
          </p>
          <h1 className="font-playfair mt-5 text-4xl leading-tight text-forest sm:text-6xl">
            Soulful Healing Adventure
          </h1>
          <p className="font-cormorant mt-6 max-w-xl text-xl italic text-charcoal/80 sm:text-2xl">
            Same you. But a kinder, calmer, brighter version.
          </p>
          <p className="mt-6 max-w-lg font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
            A two-day retreat in the foothills of the Himalayas — yoga, sound healing, quiet
            trails, and good company, away from everything that usually asks for your attention.
          </p>
          <Link
            href="/registration"
            className="mt-10 rounded-full bg-forest px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Begin Registration
          </Link>
          <p className="mt-4 font-sans text-xs text-charcoal/50">Takes about five minutes</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="text-center">
              <p className="font-cormorant text-lg italic text-sage-deep sm:text-xl">
                What awaits you
              </p>
              <h2 className="font-playfair mt-2 text-3xl text-forest sm:text-4xl">
                Ways to reconnect
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((experience, index) => (
              <Reveal key={experience.title} delay={(index % 3) * 0.08}>
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="h-11 w-11 text-forest">{experience.icon}</div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-charcoal">
                    {experience.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal/65">
                    {experience.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <p className="font-cormorant text-lg italic text-sage-deep sm:text-xl">
              Why people come
            </p>
            <h2 className="font-playfair mt-2 text-3xl text-forest sm:text-4xl">
              Whatever brought you here, it&apos;s welcome
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {INTENTION_OPTIONS.map((option) => (
                <span
                  key={option.value}
                  className="rounded-full border border-sage/40 px-5 py-2 font-sans text-sm text-charcoal/80"
                >
                  {option.label.en}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <Reveal>
            <div className="rounded-3xl border border-sage/40 bg-white/40 p-10 sm:p-14">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage-deep">
                Your Investment
              </p>
              <p className="font-playfair mt-3 text-5xl text-forest">₹5,500</p>
              <p className="mt-3 font-sans text-sm text-charcoal/70">
                Per person, for the full two-day retreat.
              </p>
              <Link
                href="/registration"
                className="mt-8 inline-block rounded-full bg-forest px-10 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-ivory transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Reserve Your Seat
              </Link>
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-sage/20 py-12 text-center">
          <Logo showWordmark={false} markSize={30} className="justify-center" />
          <p className="font-cormorant mt-4 text-sm italic text-charcoal/60">
            Good People. Good Energy. Good Experiences.
          </p>
          <p className="mt-2 font-sans text-xs text-charcoal/40">
            © 2026 Soulful Healing Adventure
          </p>
        </footer>
      </main>
    </div>
  );
}
