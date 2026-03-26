import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL =
  process.env.RESEND_FROM ?? "Budget Buddy <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }
  if (!NOTIFY_EMAIL) {
    return NextResponse.json(
      { error: "Notification email is not configured." },
      { status: 500 },
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  const submittedAt = new Date();
  const timestampFriendly = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(submittedAt);

  function escapeHtml(s: string | undefined): string {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const row = (label: string, value: string) =>
    '<tr><td style="padding: 6px 12px 6px 0; vertical-align: top; color: #4a4a6a;">' +
    escapeHtml(label) +
    '</td><td style="padding: 6px 0; color: #1E1B4B; font-weight: 600;">' +
    escapeHtml(value) +
    "</td></tr>";

  const text = [
    "New Budget Buddy signup",
    "",
    `Email: ${email}`,
    `Submitted: ${timestampFriendly}`,
  ].join("\n");

  const html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Budget Buddy signup</title></head><body style="font-family: system-ui, sans-serif; line-height: 1.6; background: #eef2ff; color: #1E1B4B; max-width: 560px; margin: 0 auto; padding: 24px;">' +
    '<div style="background: rgba(255,255,255,0.7); border: 1px solid rgba(91, 91, 214, 0.22); border-radius: 16px; padding: 20px 22px; box-shadow: 0 12px 36px rgba(30, 27, 75, 0.1);">' +
    '<h1 style="font-size: 1.25rem; color: #5b5bd6; margin: 0 0 6px;">New Budget Buddy signup</h1>' +
    '<p style="color: #4a4a6a; margin: 0;">A new beta access request just came in.</p>' +
    '<hr style="border: none; border-top: 1px solid rgba(91, 91, 214, 0.22); margin: 18px 0;" />' +
    '<h2 style="font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: #5b5bd6; margin: 0 0 8px;">Details</h2>' +
    '<table style="width: 100%; border-collapse: collapse;">' +
    row("Email", email) +
    row("Submitted", timestampFriendly) +
    "</table>" +
    "</div>" +
    "</body></html>";

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_EMAIL],
    subject: "New Budget Buddy signup",
    text,
    html,
  });

  if (error) {
    console.error("[budget-buddy-signup] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to record signup. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
