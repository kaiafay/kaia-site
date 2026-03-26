"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { scrollRevealClass } from "@/lib/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import statsConfig from "@/content/stats.json";

const BIRTH_DATE = new Date(statsConfig.birthDate);

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

  const [ageUnits, setAgeUnits] = useState(() => getAgeUnits(BIRTH_DATE));
  const [booksRead, setBooksRead] = useState(() =>
    getCalculatedStat(
      statsConfig.booksRead.baseline,
      statsConfig.booksRead.baselineDate,
      statsConfig.booksRead.rateEveryDays * MS_PER_DAY,
    ),
  );
  const [energyDrinks, setEnergyDrinks] = useState(() =>
    getCalculatedStat(
      statsConfig.energyDrinks.baseline,
      statsConfig.energyDrinks.baselineDate,
      statsConfig.energyDrinks.rateEveryDays * MS_PER_DAY,
    ),
  );
  const [hoursCoded, setHoursCoded] = useState(() =>
    getCalculatedStat(
      statsConfig.hoursCoded.baseline,
      statsConfig.hoursCoded.baselineDate,
      statsConfig.hoursCoded.rateEveryHours * MS_PER_HOUR,
    ),
  );

  useEffect(() => {
    const booksRateMs = statsConfig.booksRead.rateEveryDays * MS_PER_DAY;
    const energyRateMs = statsConfig.energyDrinks.rateEveryDays * MS_PER_DAY;
    const hoursRateMs = statsConfig.hoursCoded.rateEveryHours * MS_PER_HOUR;

    setAgeUnits(getAgeUnits(BIRTH_DATE));
    setBooksRead(
      getCalculatedStat(
        statsConfig.booksRead.baseline,
        statsConfig.booksRead.baselineDate,
        booksRateMs,
      ),
    );
    setEnergyDrinks(
      getCalculatedStat(
        statsConfig.energyDrinks.baseline,
        statsConfig.energyDrinks.baselineDate,
        energyRateMs,
      ),
    );
    setHoursCoded(
      getCalculatedStat(
        statsConfig.hoursCoded.baseline,
        statsConfig.hoursCoded.baselineDate,
        hoursRateMs,
      ),
    );

    const ageInterval = setInterval(() => {
      setAgeUnits(getAgeUnits(BIRTH_DATE));
    }, 1000);

    const booksEnergyInterval = setInterval(() => {
      setBooksRead(
        getCalculatedStat(
          statsConfig.booksRead.baseline,
          statsConfig.booksRead.baselineDate,
          booksRateMs,
        ),
      );
      setEnergyDrinks(
        getCalculatedStat(
          statsConfig.energyDrinks.baseline,
          statsConfig.energyDrinks.baselineDate,
          energyRateMs,
        ),
      );
    }, 60 * 1000);

    const hoursInterval = setInterval(
      () => {
        setHoursCoded(
          getCalculatedStat(
            statsConfig.hoursCoded.baseline,
            statsConfig.hoursCoded.baselineDate,
            hoursRateMs,
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]">
          <div
            className={`${scrollRevealClass(isInView, 0)} ${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#111]`}
          >
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

          <div
            className={`${scrollRevealClass(isInView, 2)} ${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#111]`}
          >
            <span className="font-heading text-3xl font-bold tabular-nums text-primary">
              {booksRead}
            </span>
            <StatLabel>books read</StatLabel>
          </div>

          <div
            className={`${scrollRevealClass(isInView, 4)} ${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#141414]`}
          >
            <span className="font-heading text-3xl font-bold tabular-nums text-primary">
              {energyDrinks}
            </span>
            <StatLabel>energy drinks consumed</StatLabel>
          </div>

          <div
            className={`${scrollRevealClass(isInView, 6)} ${cardBase} ${edgeGlow} ${edgeGlowHover} bg-[#141414]`}
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
