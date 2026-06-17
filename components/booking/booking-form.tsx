"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Loader2, RefreshCw } from "lucide-react";
import { DropdownSelect } from "@/components/ui/dropdown-select";
import { BOOKING_BUDGET_OPTIONS } from "@/lib/booking/schema";
import type {
  BookingAvailabilityResponse,
  BookingDay,
  BookingSlot,
} from "@/lib/booking/types";

type FormStatus = "idle" | "loading" | "success" | "error";

type BookingFormState = {
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  projectDescription: string;
  budgetRange: string;
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
  businessName: "",
  websiteUrl: "",
  projectDescription: "",
  budgetRange: "",
  notes: "",
  honeypot: "",
};

const budgetOptions = BOOKING_BUDGET_OPTIONS.map((value) => ({
  value,
  label: value,
}));

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
  const [formData, setFormData] = useState<BookingFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<BookingSuccess | null>(null);

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
        setAvailabilityError(data.error ?? "Failed to load available times.");
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
    if (
      formData.websiteUrl.trim() &&
      !/^https?:\/\/.+\..+/.test(formData.websiteUrl.trim())
    ) {
      errors.websiteUrl = "Use a full URL starting with http:// or https://.";
    }
    if (formData.projectDescription.trim().length < 20) {
      errors.projectDescription = "Share a little more about the project.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    setSuccess(null);

    try {
      const description = [
        formData.projectDescription.trim(),
        formData.notes.trim() ? `Additional notes: ${formData.notes.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          businessName: formData.businessName.trim() || undefined,
          websiteUrl: formData.websiteUrl.trim() || undefined,
          projectDescription: description,
          budgetRange: formData.budgetRange || undefined,
          selectedStartTime,
          honeypot: formData.honeypot,
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
            {success.callUrl && (
              <a
                href={success.callUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 btn-primary-glow"
              >
                Open call link
              </a>
            )}
            {success.warning && (
              <p className="mt-4 text-sm text-primary/90">{success.warning}</p>
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
      {status === "error" && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section aria-labelledby="booking-time-heading">
          <div className="flex items-center justify-between gap-4">
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
            <button
              type="button"
              onClick={() => void fetchAvailability()}
              disabled={availabilityStatus === "loading"}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
              aria-label="Refresh availability"
            >
              <RefreshCw
                size={16}
                className={
                  availabilityStatus === "loading" ? "animate-spin" : ""
                }
                aria-hidden
              />
            </button>
          </div>

          {availabilityStatus === "error" && (
            <div className="mt-5 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
              {availabilityError}
            </div>
          )}

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
              <div className="grid gap-2 sm:grid-cols-2">
                {availability.days.map((day) => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedStartTime("");
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.selectedStartTime;
                        return next;
                      });
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
                        onClick={() => {
                          setSelectedStartTime(slot.startTime);
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.selectedStartTime;
                            return next;
                          });
                        }}
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

        <section aria-labelledby="booking-details-heading">
          <h2
            id="booking-details-heading"
            className="font-heading text-xl font-semibold text-foreground"
          >
            Project details
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
              label="Business or project name"
              optional
              error={fieldErrors.businessName}
              htmlFor="businessName"
            >
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(event) =>
                  updateField("businessName", event.target.value)
                }
                disabled={status === "loading"}
                className={inputClass(!!fieldErrors.businessName)}
                placeholder="Project name"
              />
            </Field>

            <Field
              label="Website URL"
              optional
              error={fieldErrors.websiteUrl}
              htmlFor="websiteUrl"
            >
              <input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(event) =>
                  updateField("websiteUrl", event.target.value)
                }
                disabled={status === "loading"}
                className={inputClass(!!fieldErrors.websiteUrl)}
                placeholder="https://example.com"
              />
            </Field>

            <Field
              label="Project description"
              error={fieldErrors.projectDescription}
              htmlFor="projectDescription"
            >
              <textarea
                id="projectDescription"
                rows={5}
                value={formData.projectDescription}
                onChange={(event) =>
                  updateField("projectDescription", event.target.value)
                }
                disabled={status === "loading"}
                className={inputClass(
                  !!fieldErrors.projectDescription,
                  "resize-none ",
                )}
                placeholder="Tell me what you want to build and what a good outcome looks like."
              />
            </Field>

            <Field label="Budget range" optional htmlFor="budgetRange">
              <DropdownSelect
                id="budgetRange"
                value={formData.budgetRange}
                onValueChange={(value) => updateField("budgetRange", value)}
                options={budgetOptions}
                placeholder="Select a range..."
                disabled={status === "loading"}
              />
            </Field>

            <Field label="Notes" optional htmlFor="notes">
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                disabled={status === "loading"}
                className={inputClass(false, "resize-none ")}
                placeholder="Anything else I should know before the call?"
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
