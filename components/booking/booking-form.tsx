"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import type {
  BookingAvailabilityResponse,
  BookingDay,
  BookingSlot,
} from "@/lib/booking/types";

type FormStatus = "idle" | "loading" | "success" | "error";
type DatePageDirection = "none" | "previous" | "next";

type BookingFormState = {
  name: string;
  email: string;
  notes: string;
  honeypot: string;
};

type BookingSuccess = {
  id: string;
  email: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  callUrl?: string;
  warning?: string;
};

const initialFormState: BookingFormState = {
  name: "",
  email: "",
  notes: "",
  honeypot: "",
};

const MOBILE_VISIBLE_DAY_COUNT = 4;
const DESKTOP_VISIBLE_DAY_COUNT = 6;

function inputClass(hasError: boolean, extra = "") {
  return (
    `${extra}rounded-lg border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none disabled:opacity-60 ` +
    (hasError ? "border-primary/60" : "border-border focus:border-primary/50")
  );
}

export function BookingForm() {
  const [availabilityStatus, setAvailabilityStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [availabilityError, setAvailabilityError] = useState("");
  const [availability, setAvailability] =
    useState<BookingAvailabilityResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [datePageIndex, setDatePageIndex] = useState(0);
  const [datePageDirection, setDatePageDirection] =
    useState<DatePageDirection>("none");
  const [visibleDayCount, setVisibleDayCount] = useState(
    MOBILE_VISIBLE_DAY_COUNT,
  );
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const [formData, setFormData] = useState<BookingFormState>(initialFormState);
  const [formStartedAt] = useState(() => Date.now());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<BookingSuccess | null>(null);
  const detailsSectionRef = useRef<HTMLElement>(null);

  const selectedDay = useMemo(
    () => availability?.days.find((day) => day.date === selectedDate) ?? null,
    [availability, selectedDate],
  );

  const selectedSlot = useMemo(
    () =>
      selectedDay?.slots.find((slot) => slot.startTime === selectedStartTime) ??
      null,
    [selectedDay, selectedStartTime],
  );

  const visibleDays = useMemo(() => {
    const days = availability?.days ?? [];
    const startIndex = datePageIndex * visibleDayCount;
    return days.slice(startIndex, startIndex + visibleDayCount);
  }, [availability, datePageIndex, visibleDayCount]);

  const datePageCount = Math.ceil(
    (availability?.days.length ?? 0) / visibleDayCount,
  );
  const canShowPreviousDates = datePageIndex > 0;
  const canShowMoreDates = datePageIndex < datePageCount - 1;
  const visibleDateRangeLabel =
    visibleDays.length > 0 ? formatDateRange(visibleDays) : "";

  const fetchAvailability = useCallback(async () => {
    setAvailabilityStatus("loading");
    setAvailabilityError("");
    try {
      const res = await fetch("/api/booking/availability", {
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setAvailabilityStatus("error");
        setAvailabilityError(getFriendlyAvailabilityError(data.error));
        return;
      }

      setAvailability(data);
      setAvailabilityStatus("ready");
      const firstDay = data.days?.[0] as BookingDay | undefined;
      setSelectedDate((current) =>
        current && data.days.some((day: BookingDay) => day.date === current)
          ? current
          : firstDay?.date ?? "",
      );
      setSelectedStartTime((current) =>
        data.days.some((day: BookingDay) =>
          day.slots.some((slot: BookingSlot) => slot.startTime === current),
        )
          ? current
          : "",
      );
    } catch {
      setAvailabilityStatus("error");
      setAvailabilityError("Failed to load available times.");
    }
  }, []);

  useEffect(() => {
    void fetchAvailability();
  }, [fetchAvailability]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateVisibleDayCount = () => {
      setIsDesktopLayout(mediaQuery.matches);
      setVisibleDayCount(
        mediaQuery.matches
          ? DESKTOP_VISIBLE_DAY_COUNT
          : MOBILE_VISIBLE_DAY_COUNT,
      );
    };

    updateVisibleDayCount();
    mediaQuery.addEventListener("change", updateVisibleDayCount);

    return () => {
      mediaQuery.removeEventListener("change", updateVisibleDayCount);
    };
  }, []);

  useEffect(() => {
    if (datePageCount === 0) {
      setDatePageIndex(0);
      return;
    }

    if (datePageIndex > datePageCount - 1) {
      setDatePageDirection("none");
      setDatePageIndex(datePageCount - 1);
    }
  }, [datePageCount, datePageIndex]);

  useEffect(() => {
    if (!selectedDate || !availability?.days.length) return;

    const selectedDateIndex = availability.days.findIndex(
      (day) => day.date === selectedDate,
    );
    if (selectedDateIndex === -1) return;

    const selectedDatePageIndex = Math.floor(
      selectedDateIndex / visibleDayCount,
    );
    if (selectedDatePageIndex === datePageIndex) return;

    setDatePageDirection("none");
    setDatePageIndex(selectedDatePageIndex);
  }, [availability, datePageIndex, selectedDate, visibleDayCount]);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!selectedStartTime) errors.selectedStartTime = "Select a time.";
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }
    if (formData.notes.trim().length > 3000) {
      errors.notes = "Notes must be 3000 characters or less.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearSelectedTimeError = () => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.selectedStartTime;
      return next;
    });
  };

  const selectDatePage = (pageIndex: number) => {
    const days = availability?.days ?? [];
    const nextPageIndex = Math.min(
      Math.max(pageIndex, 0),
      Math.max(datePageCount - 1, 0),
    );
    const nextDate = days[nextPageIndex * visibleDayCount]?.date ?? "";

    setDatePageDirection(
      nextPageIndex === datePageIndex
        ? "none"
        : nextPageIndex > datePageIndex
          ? "next"
          : "previous",
    );
    setDatePageIndex(nextPageIndex);
    setSelectedDate(nextDate);
    setSelectedStartTime("");
    clearSelectedTimeError();
  };

  const selectStartTime = (startTime: string) => {
    setSelectedStartTime(startTime);
    clearSelectedTimeError();
    if (isDesktopLayout) return;

    window.setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    setSuccess(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          notes: formData.notes.trim() || undefined,
          selectedStartTime,
          honeypot: formData.honeypot,
          formStartedAt,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        if (data.fieldErrors) {
          setFieldErrors(flattenFieldErrors(data.fieldErrors));
        }
        if (res.status === 409) {
          setSelectedStartTime("");
          setErrorMessage(
            data.error ?? "That time was just booked. Pick another time.",
          );
          void fetchAvailability();
        }
        return;
      }

      setStatus("success");
      setSuccess({
        id: data.booking.id,
        email: data.booking.email,
        startTime: data.booking.startTime,
        endTime: data.booking.endTime,
        timeZone: data.booking.timeZone,
        callUrl: data.booking.callUrl,
        warning: data.warning,
      });
      setFormData(initialFormState);
      setFieldErrors({});
      void fetchAvailability();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success" && success) {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Check size={22} className="text-primary" aria-hidden />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              You&apos;re booked
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your discovery call is set for{" "}
              <span className="font-medium text-foreground">
                {formatDateTime(success.startTime)}
              </span>
              . Details were sent to {success.email}.
            </p>
            {success.warning && (
              <p className="mt-4 text-sm text-primary/90">
                {success.warning}
                {success.callUrl && (
                  <>
                    {" "}
                    <a
                      href={success.callUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                    >
                      Open call link.
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-border bg-card p-5 card-shadow sm:p-8"
    >
      {availabilityStatus === "error" && (
        <div className="mb-6 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
          {availabilityError}
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section aria-labelledby="booking-time-heading">
          <div>
            <h2
              id="booking-time-heading"
              className="font-heading text-xl font-semibold text-foreground"
            >
              Choose a time
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              30-minute calls, shown in Mountain time.
            </p>
          </div>

          {availabilityStatus === "loading" && (
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Loading available times...
            </div>
          )}

          {availabilityStatus === "ready" && availability?.days.length === 0 && (
            <div className="mt-5 rounded-lg border border-border bg-background px-4 py-5 text-sm text-muted-foreground">
              No discovery call times are available right now.
            </div>
          )}

          {availabilityStatus === "ready" && availability?.days.length ? (
            <div className="mt-5 flex flex-col gap-5">
              {datePageCount > 1 && (
                <div className="flex min-h-9 items-center justify-between gap-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {visibleDateRangeLabel}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => selectDatePage(datePageIndex - 1)}
                      disabled={!canShowPreviousDates}
                      className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:pointer-events-none disabled:text-muted-foreground/40 disabled:opacity-50"
                      aria-label="Show earlier dates"
                    >
                      <ArrowLeft size={15} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => selectDatePage(datePageIndex + 1)}
                      disabled={!canShowMoreDates}
                      className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:pointer-events-none disabled:text-muted-foreground/40 disabled:opacity-50"
                      aria-label="Show later dates"
                    >
                      <ArrowRight size={15} aria-hidden />
                    </button>
                  </div>
                </div>
              )}

              <div
                key={datePageIndex}
                className={`${getDatePageAnimationClass(
                  datePageDirection,
                )} grid gap-2 sm:grid-cols-2`}
              >
                {visibleDays.map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedStartTime("");
                      clearSelectedTimeError();
                    }}
                    className={`rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                      selectedDate === day.date
                        ? "border-primary/70 bg-primary/10 text-foreground"
                        : "border-border bg-input text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span className="block font-medium">{day.label}</span>
                    <span className="mt-1 block text-xs">
                      {day.slots.length} times
                    </span>
                  </button>
                ))}
              </div>

              {selectedDay && (
                <div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {selectedDay.slots.map((slot) => (
                      <button
                        key={slot.startTime}
                        type="button"
                        onClick={() => selectStartTime(slot.startTime)}
                        className={`min-h-11 rounded-lg border px-3 text-sm font-medium transition-all ${
                          selectedStartTime === slot.startTime
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.selectedStartTime && (
                    <p className="mt-2 text-sm text-primary/90" role="alert">
                      {fieldErrors.selectedStartTime}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </section>

        <section
          ref={detailsSectionRef}
          aria-labelledby="booking-details-heading"
        >
          <h2
            id="booking-details-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Your details
          </h2>
          {selectedSlot && (
            <p className="mt-1 text-sm text-muted-foreground">
              Selected: {formatDateTime(selectedSlot.startTime)}
            </p>
          )}

          <div className="mt-5 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={fieldErrors.name} htmlFor="name">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  disabled={status === "loading"}
                  className={inputClass(!!fieldErrors.name)}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" error={fieldErrors.email} htmlFor="email">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  disabled={status === "loading"}
                  className={inputClass(!!fieldErrors.email)}
                  placeholder="you@email.com"
                />
              </Field>
            </div>

            <Field
              label="Notes"
              optional
              error={fieldErrors.notes}
              htmlFor="notes"
            >
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                disabled={status === "loading"}
                className={inputClass(!!fieldErrors.notes, "resize-none ")}
                placeholder="Anything I should know before the call?"
              />
            </Field>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(event) => updateField("honeypot", event.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={status === "loading" || availabilityStatus !== "ready"}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden />
                  Booking...
                </>
              ) : (
                "Book discovery call"
              )}
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}

function Field({
  label,
  optional = false,
  error,
  htmlFor,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}{" "}
        {optional && (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-sm text-primary/90" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function flattenFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fieldErrors)
      .filter(([, value]) => value?.[0])
      .map(([key, value]) => [key, value?.[0] ?? "Invalid value."]),
  );
}

function getFriendlyAvailabilityError(error: string | undefined): string {
  if (error?.toLowerCase().includes("database")) {
    return "Booking is not available yet. Send a message from the Work With Me page if you want to start a project.";
  }

  return error ?? "Failed to load available times.";
}

function getDatePageAnimationClass(direction: DatePageDirection): string {
  if (direction === "previous") return "animate-booking-dates-previous";
  if (direction === "next") return "animate-booking-dates-next";
  return "animate-fade-in-up";
}

function formatDateRange(days: BookingDay[]): string {
  const firstDate = days[0]?.date;
  const lastDate = days.at(-1)?.date;
  if (!firstDate) return "";
  if (!lastDate || firstDate === lastDate) return formatShortDate(firstDate);

  return `${formatShortDate(firstDate)} - ${formatShortDate(lastDate)}`;
}

function formatShortDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatDateTime(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Boise",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(isoDate));
}
