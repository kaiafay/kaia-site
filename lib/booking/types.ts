export type BookingStatus = "confirmed" | "requested" | "cancelled";

export type BookingSource = "discovery-call";

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type AvailabilityWindow = {
  start: string;
  end: string;
};

export type WeeklyAvailability = Partial<Record<Weekday, AvailabilityWindow[]>>;

export type BookingSlot = {
  startTime: string;
  endTime: string;
  date: string;
  label: string;
};

export type BookingDay = {
  date: string;
  label: string;
  slots: BookingSlot[];
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  businessName: string | null;
  websiteUrl: string | null;
  projectDescription: string;
  budgetRange: string | null;
  startTime: string;
  endTime: string;
  timeZone: string;
  status: BookingStatus;
  source: BookingSource;
  resendNotificationId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BookingAvailabilityResponse = {
  timeZone: string;
  durationMinutes: number;
  days: BookingDay[];
};
