import type {
  AvailabilityWindow,
  BookingDay,
  BookingSlot,
  Weekday,
  WeeklyAvailability,
} from "@/lib/booking/types";

export const BOOKING_TIME_ZONE = "America/Boise";
export const BOOKING_DURATION_MINUTES = 30;
export const BOOKING_WINDOW_DAYS = 21;
export const BOOKING_MINIMUM_NOTICE_HOURS = 24;

// Add specific YYYY-MM-DD dates to block one-off days (travel, holidays).
// Past dates have no effect and are removed once they've gone by.
export const BLOCKED_BOOKING_DATES: readonly string[] = [];

export const WEEKLY_AVAILABILITY: WeeklyAvailability = {
  monday: [
    { start: "09:00", end: "11:30" },
    { start: "13:00", end: "17:00" },
  ],
  wednesday: [{ start: "09:00", end: "14:00" }],
  thursday: [
    { start: "13:00", end: "17:00" },
  ],
};

const WEEKDAYS: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const blockedBookingDateSet = new Set<string>(BLOCKED_BOOKING_DATES);

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type GenerateSlotsOptions = {
  now?: Date;
  bookedStartTimes?: Iterable<string>;
};

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING_TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

const datePartFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function formatBookingDayLabel(date: string): string {
  return dayFormatter.format(localDateStartToUtc(date));
}

export function formatBookingTimeLabel(isoDate: string): string {
  return timeFormatter.format(new Date(isoDate));
}

export function generateBookingSlots(
  options: GenerateSlotsOptions = {},
): BookingSlot[] {
  const now = options.now ?? new Date();
  const earliestStart = new Date(
    now.getTime() + BOOKING_MINIMUM_NOTICE_HOURS * 60 * 60 * 1000,
  );
  const bookedStartTimes = new Set(options.bookedStartTimes ?? []);
  const localToday = getZonedDateString(now);
  const slots: BookingSlot[] = [];

  for (let offset = 0; offset < BOOKING_WINDOW_DAYS; offset += 1) {
    const date = addDaysToDateString(localToday, offset);
    if (isBlockedBookingDate(date)) continue;

    const weekday = getWeekdayForDate(date);
    const windows = WEEKLY_AVAILABILITY[weekday] ?? [];

    for (const window of windows) {
      slots.push(
        ...generateWindowSlots({
          date,
          window,
          earliestStart,
          bookedStartTimes,
        }),
      );
    }
  }

  return slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function isBlockedBookingDate(date: string): boolean {
  return blockedBookingDateSet.has(date);
}

export function groupSlotsByDay(slots: BookingSlot[]): BookingDay[] {
  const days = new Map<string, BookingSlot[]>();

  for (const slot of slots) {
    const existing = days.get(slot.date) ?? [];
    existing.push(slot);
    days.set(slot.date, existing);
  }

  return Array.from(days.entries()).map(([date, daySlots]) => ({
    date,
    label: formatBookingDayLabel(date),
    slots: daySlots,
  }));
}

export function isGeneratedBookingSlot(
  startTime: string,
  options: GenerateSlotsOptions = {},
): boolean {
  return generateBookingSlots(options).some((slot) => slot.startTime === startTime);
}

export function getBookingSlotByStartTime(
  startTime: string,
  options: GenerateSlotsOptions = {},
): BookingSlot | null {
  return (
    generateBookingSlots(options).find((slot) => slot.startTime === startTime) ??
    null
  );
}

export function getBookingRange(now = new Date()): {
  startTime: string;
  endTime: string;
} {
  const localToday = getZonedDateString(now);
  const startTime = localDateStartToUtc(localToday).toISOString();
  const endDate = addDaysToDateString(localToday, BOOKING_WINDOW_DAYS);
  const endTime = localDateStartToUtc(endDate).toISOString();

  return { startTime, endTime };
}

function generateWindowSlots({
  date,
  window,
  earliestStart,
  bookedStartTimes,
}: {
  date: string;
  window: AvailabilityWindow;
  earliestStart: Date;
  bookedStartTimes: Set<string>;
}): BookingSlot[] {
  const slots: BookingSlot[] = [];
  let cursorMinutes = parseTimeToMinutes(window.start);
  const endMinutes = parseTimeToMinutes(window.end);

  while (cursorMinutes + BOOKING_DURATION_MINUTES <= endMinutes) {
    const startTime = localDateTimeToUtc(date, cursorMinutes).toISOString();
    const endTime = localDateTimeToUtc(
      date,
      cursorMinutes + BOOKING_DURATION_MINUTES,
    ).toISOString();

    if (new Date(startTime) >= earliestStart && !bookedStartTimes.has(startTime)) {
      slots.push({
        startTime,
        endTime,
        date,
        label: formatBookingTimeLabel(startTime),
      });
    }

    cursorMinutes += BOOKING_DURATION_MINUTES;
  }

  return slots;
}

function parseTimeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getWeekdayForDate(date: string): Weekday {
  const utcDate = localDateStartToUtc(date);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIME_ZONE,
    weekday: "long",
  })
    .format(utcDate)
    .toLowerCase();

  return WEEKDAYS.includes(weekday as Weekday)
    ? (weekday as Weekday)
    : "sunday";
}

function getZonedDateString(date: Date): string {
  const parts = getZonedParts(date);
  return formatDateString(parts.year, parts.month, parts.day);
}

function getZonedParts(date: Date): DateParts {
  const parts = datePartFormatter.formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<keyof DateParts, number>;

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  };
}

function addDaysToDateString(date: string, days: number): string {
  const [year, month, day] = date.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day + days));
  return formatDateString(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
  );
}

function localDateStartToUtc(date: string): Date {
  return localDateTimeToUtc(date, 0);
}

function localDateTimeToUtc(date: string, minutesFromMidnight: number): Date {
  const [year, month, day] = date.split("-").map(Number);
  const hour = Math.floor(minutesFromMidnight / 60);
  const minute = minutesFromMidnight % 60;
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const zonedParts = getZonedParts(utcGuess);
  const offsetMs =
    Date.UTC(
      zonedParts.year,
      zonedParts.month - 1,
      zonedParts.day,
      zonedParts.hour,
      zonedParts.minute,
      zonedParts.second,
    ) - utcGuess.getTime();

  return new Date(utcGuess.getTime() - offsetMs);
}

function formatDateString(year: number, month: number, day: number): string {
  return [
    String(year).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}
