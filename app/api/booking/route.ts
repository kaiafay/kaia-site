import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  BOOKING_TIME_ZONE,
  getBookingRange,
  getBookingSlotByStartTime,
} from "@/lib/booking/availability";
import {
  DuplicateBookingSlotError,
  createBooking,
  listActiveBookingsBetween,
  updateBookingNotificationId,
} from "@/lib/booking/repository";
import { bookingRequestSchema } from "@/lib/booking/schema";
import type { Booking } from "@/lib/booking/types";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL =
  process.env.RESEND_FROM ?? "Discovery Call <onboarding@resend.dev>";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const configError = getConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 500 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = bookingRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the booking form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const requestBody = parsed.data;
  if (requestBody.honeypot?.trim()) {
    return NextResponse.json({ success: true });
  }

  if (
    requestBody.formStartedAt &&
    Date.now() - requestBody.formStartedAt < 3000
  ) {
    return NextResponse.json(
      { error: "Please wait a moment and try again." },
      { status: 400 },
    );
  }

  try {
    const range = getBookingRange();
    const bookings = await listActiveBookingsBetween(range);
    const bookedStartTimes = bookings.map((booking) => booking.startTime);
    const slot = getBookingSlotByStartTime(requestBody.selectedStartTime, {
      bookedStartTimes,
    });

    if (!slot) {
      return NextResponse.json(
        { error: "That time is no longer available. Pick another time." },
        { status: 409 },
      );
    }

    const booking = await createBooking({
      name: requestBody.name,
      email: requestBody.email,
      notes: requestBody.notes,
      startTime: slot.startTime,
    });

    const emailResult = await sendBookingEmails(booking);
    if (emailResult.notificationId) {
      try {
        await updateBookingNotificationId({
          bookingId: booking.id,
          resendNotificationId: emailResult.notificationId,
        });
      } catch (error) {
        console.error("[booking] Failed to store Resend notification id:", error);
      }
    }

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      warning: emailResult.success
        ? undefined
        : "Booked, but confirmation email could not be sent.",
      booking: {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        startTime: booking.startTime,
        endTime: booking.endTime,
        timeZone: booking.timeZone,
        callUrl: process.env.DISCOVERY_CALL_URL,
      },
    });
  } catch (error) {
    if (error instanceof DuplicateBookingSlotError) {
      return NextResponse.json(
        { error: "That time was just booked. Pick another time." },
        { status: 409 },
      );
    }

    console.error("[booking] Failed to create booking:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function getConfigError(): string | null {
  if (!process.env.DATABASE_URL) return "Booking database is not configured.";
  if (!process.env.RESEND_API_KEY) return "Email service is not configured.";
  if (!CONTACT_EMAIL) return "Contact email is not configured.";
  if (!process.env.DISCOVERY_CALL_URL) {
    return "Discovery call URL is not configured.";
  }
  return null;
}

async function sendBookingEmails(
  booking: Booking,
): Promise<{ success: boolean; notificationId?: string }> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ownerEmail = buildOwnerEmail(booking);
  const visitorEmail = buildVisitorEmail(booking);
  let notificationId: string | undefined;

  try {
    const ownerResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL as string],
      replyTo: booking.email,
      subject: `Discovery call booked: ${booking.name}`,
      text: ownerEmail.text,
      html: ownerEmail.html,
    });

    if (ownerResult.error) {
      throw ownerResult.error;
    }

    notificationId = ownerResult.data?.id;

    const visitorResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [booking.email],
      replyTo: FROM_EMAIL,
      subject: "Your discovery call is booked",
      text: visitorEmail.text,
      html: visitorEmail.html,
    });

    if (visitorResult.error) {
      throw visitorResult.error;
    }

    return { success: true, notificationId };
  } catch (error) {
    console.error("[booking] Resend error:", error);
    return { success: false, notificationId };
  }
}

function buildOwnerEmail(booking: Booking): { text: string; html: string } {
  const scheduledFor = formatBookingDateTime(booking.startTime);
  const notes = booking.notes ?? "No notes provided.";
  const rows: [string, string | null][] = [
    ["Name", booking.name],
    ["Email", booking.email],
    ["Scheduled for", scheduledFor],
    ["Booking ID", booking.id],
  ];
  const text = [
    "New discovery call booking",
    "",
    ...rows
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "Notes:",
    notes,
  ].join("\n");

  const html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Discovery call booked</title></head><body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;">' +
    '<h1 style="font-size: 1.25rem; color: #8f3848;">Discovery call booked</h1>' +
    '<p style="color: #666;">A new discovery call was reserved on kaia.dev.</p>' +
    '<hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />' +
    '<table style="width: 100%; border-collapse: collapse;">' +
    rows
      .filter(([, value]) => value)
      .map(([label, value]) => emailRow(label, value ?? ""))
      .join("") +
    "</table>" +
    '<h2 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8f3848; margin: 20px 0 8px;">Notes</h2>' +
    '<div style="white-space: pre-wrap; word-break: break-word; padding: 12px 14px; background: #fafafa; border: 1px solid #eee; border-radius: 6px;">' +
    escapeHtml(notes) +
    "</div>" +
    "</body></html>";

  return { text, html };
}

function buildVisitorEmail(booking: Booking): { text: string; html: string } {
  const scheduledFor = formatBookingDateTime(booking.startTime);
  const callUrl = process.env.DISCOVERY_CALL_URL as string;
  const text = [
    `Hi ${booking.name},`,
    "",
    "Your 30-minute discovery call is booked.",
    "",
    `Time: ${scheduledFor}`,
    `Call link: ${callUrl}`,
    "",
    "We'll use the call to talk through fit, scope, timeline, and next steps.",
    `If anything changes, reply to this email or contact ${CONTACT_EMAIL}.`,
  ].join("\n");

  const html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Your discovery call is booked</title></head><body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;">' +
    '<h1 style="font-size: 1.25rem; color: #8f3848;">Your discovery call is booked</h1>' +
    "<p>Hi " +
    escapeHtml(booking.name) +
    ",</p>" +
    "<p>Your 30-minute discovery call is booked.</p>" +
    '<table style="width: 100%; border-collapse: collapse;">' +
    emailRow("Time", scheduledFor) +
    emailRow("Call link", callUrl) +
    "</table>" +
    "<p>We'll use the call to talk through fit, scope, timeline, and next steps.</p>" +
    "<p>If anything changes, reply to this email or contact " +
    escapeHtml(CONTACT_EMAIL) +
    ".</p>" +
    "</body></html>";

  return { text, html };
}

function formatBookingDateTime(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(isoDate));
}

function emailRow(label: string, value: string): string {
  return (
    '<tr><td style="padding: 6px 12px 6px 0; vertical-align: top; color: #666;">' +
    escapeHtml(label) +
    '</td><td style="padding: 6px 0;">' +
    escapeHtml(value) +
    "</td></tr>"
  );
}

function escapeHtml(value: string | undefined | null): string {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
