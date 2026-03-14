"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";

// To reset or override a stat: update baseline to the current real number
// and baselineDate to today's date. The rate will pick up from there.
const STATS_CONFIG = {
  booksRead: {
    baseline: 22,
    baselineDate: "2026-03-13",
    rateMs: 6 * 24 * 60 * 60 * 1000, // one book every 6 days
  },
  energyDrinks: {
    baseline: 67,
    baselineDate: "2026-03-13",
    rateMs: 1.2 * 24 * 60 * 60 * 1000, // one every 1.2 days
  },
  hoursCoded: {
    baseline: 94,
    baselineDate: "2026-03-13",
    rateMs: 9 * 60 * 60 * 1000, // one hour every 9 hours
  },
};

// December 14, 1999, 11:47 AM UTC+8 → 03:47 UTC
const BIRTH_DATE = new Date(Date.UTC(1999, 11, 14, 3, 47, 0, 0));

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_MINUTE = 60 * 1000;

function getAgeUnits(birth: Date): {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const elapsed = Date.now() - birth.getTime();
  const years = Math.floor(elapsed / MS_PER_YEAR);
  let remaining = elapsed - years * MS_PER_YEAR;
  const days = Math.floor(remaining / MS_PER_DAY);
  remaining -= days * MS_PER_DAY;
  const hours = Math.floor(remaining / MS_PER_HOUR);
  remaining -= hours * MS_PER_HOUR;
  const minutes = Math.floor(remaining / MS_PER_MINUTE);
  const seconds = Math.floor((remaining % MS_PER_MINUTE) / 1000);
  return { years, days, hours, minutes, seconds };
}

function getCalculatedStat(
  baseline: number,
  baselineDateStr: string,
  rateMs: number,
): number {
  const baselineDate = new Date(baselineDateStr + "T00:00:00Z");
  const elapsed = Date.now() - baselineDate.getTime();
  return baseline + Math.floor(elapsed / rateMs);
}

const cardBase =
  "flex min-h-[140px] w-full flex-col justify-center overflow-hidden rounded-xl px-6 py-6 transition-all duration-300 ease-out sm:px-8 sm:py-8";
const edgeGlow =
  "shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04),inset_4px_0_24px_-4px_rgba(143,56,72,0.45)]";
const edgeGlowHover =
  "hover:shadow-[0_24px_56px_rgba(0,0,0,0.6),inset_4px_0_24px_-4px_rgba(143,56,72,0.5)] hover:translate-y-[-4px]";

function StatLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function PersonalStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  // TODO: Hydration flash — stats start at 0 then jump after mount. To fix: compute
  // initial values once (e.g. in a shared util or via props) so server and client
  // can render the same first paint and avoid the brief 0 → value flash.
  const [ageUnits, setAgeUnits] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [booksRead, setBooksRead] = useState(0);
  const [energyDrinks, setEnergyDrinks] = useState(0);
  const [hoursCoded, setHoursCoded] = useState(0);

  useEffect(() => {
    setAgeUnits(getAgeUnits(BIRTH_DATE));
    setBooksRead(
      getCalculatedStat(
        STATS_CONFIG.booksRead.baseline,
        STATS_CONFIG.booksRead.baselineDate,
        STATS_CONFIG.booksRead.rateMs,
      ),
    );
    setEnergyDrinks(
      getCalculatedStat(
        STATS_CONFIG.energyDrinks.baseline,
        STATS_CONFIG.energyDrinks.baselineDate,
        STATS_CONFIG.energyDrinks.rateMs,
      ),
    );
    setHoursCoded(
      getCalculatedStat(
        STATS_CONFIG.hoursCoded.baseline,
        STATS_CONFIG.hoursCoded.baselineDate,
        STATS_CONFIG.hoursCoded.rateMs,
      ),
    );

    const ageInterval = setInterval(() => {
      setAgeUnits(getAgeUnits(BIRTH_DATE));
    }, 1000);

    const booksEnergyInterval = setInterval(() => {
      setBooksRead(
        getCalculatedStat(
          STATS_CONFIG.booksRead.baseline,
          STATS_CONFIG.booksRead.baselineDate,
          STATS_CONFIG.booksRead.rateMs,
        ),
      );
      setEnergyDrinks(
        getCalculatedStat(
          STATS_CONFIG.energyDrinks.baseline,
          STATS_CONFIG.energyDrinks.baselineDate,
          STATS_CONFIG.energyDrinks.rateMs,
        ),
      );
    }, 60 * 1000);

    const hoursInterval = setInterval(
      () => {
        setHoursCoded(
          getCalculatedStat(
            STATS_CONFIG.hoursCoded.baseline,
            STATS_CONFIG.hoursCoded.baselineDate,
            STATS_CONFIG.hoursCoded.rateMs,
          ),
        );
      },
      3 * 60 * 1000,
    );

    return () => {
      clearInterval(ageInterval);
      clearInterval(booksEnergyInterval);
      clearInterval(hoursInterval);
    };
  }, []);

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`${scrollRevealClass(isInView)} mb-12`}>
          <SectionLabel as="h2">Stats</SectionLabel>
          <SectionHeading className="mt-2">By the numbers</SectionHeading>
        </div>

        <div
          className={`${scrollRevealClass(isInView, 2)} grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]`}
        >
          <div className={`${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#111]`}>
            <div className="flex flex-nowrap items-baseline gap-x-1.5 whitespace-nowrap text-xl sm:text-2xl">
              <span className="font-heading font-bold tabular-nums text-primary">
                {ageUnits.years}
              </span>
              <span className="text-xs text-muted-foreground">y</span>
              <span className="font-heading font-bold tabular-nums text-primary">
                {ageUnits.days}
              </span>
              <span className="text-xs text-muted-foreground">d</span>
              <span className="font-heading font-bold tabular-nums text-primary">
                {ageUnits.hours}
              </span>
              <span className="text-xs text-muted-foreground">h</span>
              <span className="font-heading font-bold tabular-nums text-primary">
                {ageUnits.minutes}
              </span>
              <span className="text-xs text-muted-foreground">m</span>
              <span className="font-heading font-bold tabular-nums text-primary">
                {String(ageUnits.seconds).padStart(2, "0")}
              </span>
              <span className="text-xs text-muted-foreground">s</span>
            </div>
            <StatLabel>current age</StatLabel>
          </div>

          <div className={`${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#111]`}>
            <span className="font-heading text-3xl font-bold tabular-nums text-primary">
              {booksRead}
            </span>
            <StatLabel>books read</StatLabel>
          </div>

          <div
            className={`${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#141414]`}
          >
            <span className="font-heading text-3xl font-bold tabular-nums text-primary">
              {energyDrinks}
            </span>
            <StatLabel>energy drinks consumed</StatLabel>
          </div>

          <div
            className={`${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#141414]`}
          >
            <span className="font-heading text-3xl font-bold tabular-nums text-primary">
              {hoursCoded}
            </span>
            <StatLabel>hours coded</StatLabel>
          </div>
        </div>
      </div>
    </section>
  );
}
