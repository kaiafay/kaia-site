import { NextResponse } from "next/server";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_TIME_ZONE,
  generateBookingSlots,
  getBookingRange,
  groupSlotsByDay,
} from "@/lib/booking/availability";
import { listActiveBookingsBetween } from "@/lib/booking/repository";
import type { BookingAvailabilityResponse } from "@/lib/booking/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Booking database is not configured." },
      { status: 500 },
    );
  }

  try {
    const range = getBookingRange();
    const bookings = await listActiveBookingsBetween(range);
    const bookedStartTimes = bookings.map((booking) => booking.startTime);
    const slots = generateBookingSlots({ bookedStartTimes });
    const response: BookingAvailabilityResponse = {
      timeZone: BOOKING_TIME_ZONE,
      durationMinutes: BOOKING_DURATION_MINUTES,
      days: groupSlotsByDay(slots),
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[booking/availability] Failed to load availability:", error);
    return NextResponse.json(
      { error: "Failed to load availability." },
      { status: 500 },
    );
  }
}
