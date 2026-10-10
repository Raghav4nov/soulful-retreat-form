"use client";

import { useMemo, useState } from "react";
import type { Registrant } from "@/lib/adminFields";

const DAYS = 14;
const CHART_WIDTH = 640;
const CHART_HEIGHT = 190;
const AXIS_WIDTH = 28;
const AXIS_HEIGHT = 28;
const TOP_PADDING = 16;
const BAR_RADIUS = 4;
const MAX_BAR_WIDTH = 24;

type DayBucket = { date: Date; label: string; count: number };

function niceMax(value: number): number {
  if (value <= 1) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  for (const step of [1, 2, 5, 10]) {
    if (value <= step * pow) return step * pow;
  }
  return 10 * pow;
}

function roundedTopBarPath(x: number, y: number, width: number, height: number): string {
  if (height <= 0) return "";
  const r = Math.min(BAR_RADIUS, width / 2, height);
  const top = y;
  const bottom = y + height;
  return `M${x},${bottom} L${x},${top + r} Q${x},${top} ${x + r},${top} L${x + width - r},${top} Q${x + width},${top} ${x + width},${top + r} L${x + width},${bottom} Z`;
}

export default function RegistrationsChart({ registrants }: { registrants: Registrant[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const buckets = useMemo<DayBucket[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: DayBucket[] = [];
    for (let i = DAYS - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        date,
        label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        count: 0,
      });
    }

    const dayIndexByKey = new Map(days.map((day, index) => [day.date.toDateString(), index]));
    for (const registrant of registrants) {
      const submitted = new Date(registrant["Submitted At"]);
      if (Number.isNaN(submitted.getTime())) continue;
      submitted.setHours(0, 0, 0, 0);
      const index = dayIndexByKey.get(submitted.toDateString());
      if (index !== undefined) days[index].count += 1;
    }

    return days;
  }, [registrants]);

  const maxValue = niceMax(Math.max(...buckets.map((b) => b.count)));
  const plotWidth = CHART_WIDTH - AXIS_WIDTH;
  const plotHeight = CHART_HEIGHT - AXIS_HEIGHT - TOP_PADDING;
  const slotWidth = plotWidth / DAYS;
  const barWidth = Math.min(MAX_BAR_WIDTH, slotWidth - 6);

  const yTicks = [0, Math.round(maxValue / 2), maxValue].filter(
    (value, index, arr) => arr.indexOf(value) === index
  );

  const totalThisWindow = buckets.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="rounded-2xl border border-sage/30 bg-white p-6">
      <div className="flex items-baseline justify-between">
        <p className="font-sans text-sm font-semibold text-charcoal">Registrations — Last 14 Days</p>
        <p className="font-sans text-xs text-charcoal/50">{totalThisWindow} total</p>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label={`Registrations per day over the last ${DAYS} days`}
        >
          {yTicks.map((tick) => {
            const y = TOP_PADDING + plotHeight - (tick / maxValue) * plotHeight;
            return (
              <g key={tick}>
                <line
                  x1={AXIS_WIDTH}
                  x2={CHART_WIDTH}
                  y1={y}
                  y2={y}
                  stroke="#174D3B"
                  strokeOpacity={0.12}
                  strokeWidth={1}
                />
                <text x={0} y={y + 3} className="fill-charcoal/40" style={{ fontSize: 9 }}>
                  {tick}
                </text>
              </g>
            );
          })}

          {buckets.map((bucket, index) => {
            const slotX = AXIS_WIDTH + index * slotWidth;
            const barX = slotX + (slotWidth - barWidth) / 2;
            const barHeight = maxValue > 0 ? (bucket.count / maxValue) * plotHeight : 0;
            const barY = TOP_PADDING + plotHeight - barHeight;
            const isHovered = hovered === index;
            const showLabel = DAYS <= 10 || index % 2 === 0 || index === DAYS - 1;

            return (
              <g key={bucket.date.toDateString()}>
                <path
                  d={roundedTopBarPath(barX, barY, barWidth, Math.max(barHeight, bucket.count > 0 ? 2 : 0))}
                  className="fill-forest"
                  fillOpacity={isHovered ? 1 : 0.85}
                />
                <rect
                  x={slotX}
                  y={TOP_PADDING}
                  width={slotWidth}
                  height={plotHeight}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${bucket.label}: ${bucket.count} registration${bucket.count === 1 ? "" : "s"}`}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className="cursor-default outline-none"
                />
                {showLabel && (
                  <text
                    x={slotX + slotWidth / 2}
                    y={CHART_HEIGHT - 6}
                    textAnchor="middle"
                    className="fill-charcoal/40"
                    style={{ fontSize: 9 }}
                  >
                    {bucket.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hovered !== null && (
          <div
            className="pointer-events-none absolute rounded-lg bg-charcoal px-2.5 py-1.5 font-sans text-xs text-ivory shadow-lg"
            style={{
              left: `${((AXIS_WIDTH + (hovered + 0.5) * slotWidth) / CHART_WIDTH) * 100}%`,
              top: 0,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="font-semibold">{buckets[hovered].count}</span>{" "}
            {buckets[hovered].count === 1 ? "registration" : "registrations"} · {buckets[hovered].label}
          </div>
        )}
      </div>
    </div>
  );
}
