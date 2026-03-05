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
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Interest: ${interest ?? "(not selected)"}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject,
    text,
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
