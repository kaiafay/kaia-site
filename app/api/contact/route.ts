import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = process.env.CONTACT_EMAIL
const FROM_EMAIL = process.env.RESEND_FROM ?? "Contact Form <onboarding@resend.dev>"

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    )
  }
  if (!CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "Contact email is not configured." },
      { status: 500 }
    )
  }

  let body: { name?: string; email?: string; interest?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    )
  }

  const { name, email, interest, message } = body
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    )
  }

  const subject = `New message from ${name} via kaia.dev`
  const interestLine = interest ?? "(not selected)"
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interest: ${interestLine}`,
    "",
    "Message:",
    message,
  ].join("\n")

  function escapeHtml(s: string | undefined): string {
    if (s == null) return ""
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
  }

  const row = (label: string, value: string) =>
    "<tr><td style=\"padding: 6px 12px 6px 0; vertical-align: top; color: #666;\">" +
    escapeHtml(label) +
    "</td><td style=\"padding: 6px 0;\">" +
    escapeHtml(value) +
    "</td></tr>"

  const html =
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" +
    escapeHtml(`Contact: ${name}`) +
    "</title></head><body style=\"font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;\">" +
    "<h1 style=\"font-size: 1.25rem; color: #8f3848;\">New message from kaia.dev</h1>" +
    "<p style=\"color: #666;\">From " +
    escapeHtml(name) +
    " &lt;" +
    escapeHtml(email) +
    "&gt;</p>" +
    "<hr style=\"border: none; border-top: 1px solid #eee; margin: 24px 0;\" />" +
    "<h2 style=\"font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8f3848; margin: 0 0 8px;\">Details</h2>" +
    "<table style=\"width: 100%; border-collapse: collapse;\">" +
    row("Name", name) +
    row("Email", email) +
    row("Interest", interestLine) +
    "</table>" +
    "<h2 style=\"font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8f3848; margin: 20px 0 8px;\">Message</h2>" +
    "<div style=\"white-space: pre-wrap; word-break: break-word; padding: 12px 14px; background: #fafafa; border: 1px solid #eee; border-radius: 6px;\">" +
    escapeHtml(message) +
    "</div>" +
    "</body></html>"

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject,
    text,
    html,
  })

  if (error) {
    console.error("[contact] Resend error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, id: data?.id })
}
