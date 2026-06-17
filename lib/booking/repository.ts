import { randomUUID } from "crypto";
import {
  BOOKING_DURATION_MINUTES,
  BOOKING_TIME_ZONE,
} from "@/lib/booking/availability";
import { getBookingSql } from "@/lib/booking/db";
import type { Booking, BookingSource, BookingStatus } from "@/lib/booking/types";

type BookingRow = {
  id: string;
  name: string;
  email: string;
  business_name: string | null;
  website_url: string | null;
  project_description: string;
  budget_range: string | null;
  start_time: Date | string;
  end_time: Date | string;
  time_zone: string;
  status: BookingStatus;
  source: BookingSource;
  resend_notification_id: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

export type CreateBookingInput = {
  name: string;
  email: string;
  businessName?: string;
  websiteUrl?: string;
  projectDescription: string;
  budgetRange?: string;
  startTime: string;
  status?: BookingStatus;
  source?: BookingSource;
};

export class DuplicateBookingSlotError extends Error {
  constructor() {
    super("Booking slot is already reserved.");
    this.name = "DuplicateBookingSlotError";
  }
}

export async function listActiveBookingsBetween({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}): Promise<Booking[]> {
  const sql = getBookingSql();
  const rows = (await sql`
    select
      id,
      name,
      email,
      business_name,
      website_url,
      project_description,
      budget_range,
      start_time,
      end_time,
      time_zone,
      status,
      source,
      resend_notification_id,
      created_at,
      updated_at
    from bookings
    where status in ('confirmed', 'requested')
      and start_time >= ${startTime}
      and start_time < ${endTime}
    order by start_time asc
  `) as BookingRow[];

  return rows.map(mapBookingRow);
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<Booking> {
  const sql = getBookingSql();
  const id = randomUUID();
  const startTime = new Date(input.startTime);
  const endTime = new Date(
    startTime.getTime() + BOOKING_DURATION_MINUTES * 60 * 1000,
  );

  try {
    const rows = (await sql`
      insert into bookings (
        id,
        name,
        email,
        business_name,
        website_url,
        project_description,
        budget_range,
        start_time,
        end_time,
        time_zone,
        status,
        source
      )
      values (
        ${id},
        ${input.name},
        ${input.email},
        ${input.businessName ?? null},
        ${input.websiteUrl ?? null},
        ${input.projectDescription},
        ${input.budgetRange ?? null},
        ${startTime.toISOString()},
        ${endTime.toISOString()},
        ${BOOKING_TIME_ZONE},
        ${input.status ?? "confirmed"},
        ${input.source ?? "discovery-call"}
      )
      returning
        id,
        name,
        email,
        business_name,
        website_url,
        project_description,
        budget_range,
        start_time,
        end_time,
        time_zone,
        status,
        source,
        resend_notification_id,
        created_at,
        updated_at
    `) as BookingRow[];

    return mapBookingRow(rows[0]);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new DuplicateBookingSlotError();
    }
    throw error;
  }
}

export async function updateBookingNotificationId({
  bookingId,
  resendNotificationId,
}: {
  bookingId: string;
  resendNotificationId: string;
}): Promise<void> {
  const sql = getBookingSql();
  await sql`
    update bookings
    set resend_notification_id = ${resendNotificationId},
        updated_at = now()
    where id = ${bookingId}
  `;
}

function mapBookingRow(row: BookingRow): Booking {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    businessName: row.business_name,
    websiteUrl: row.website_url,
    projectDescription: row.project_description,
    budgetRange: row.budget_range,
    startTime: toIsoString(row.start_time),
    endTime: toIsoString(row.end_time),
    timeZone: row.time_zone,
    status: row.status,
    source: row.source,
    resendNotificationId: row.resend_notification_id,
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
  };
}

function toIsoString(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
