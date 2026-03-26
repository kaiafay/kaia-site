import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAIL = process.env.CONTACT_EMAIL
const FROM_EMAIL =
  process.env.RESEND_FROM ?? "Budget Buddy <noreply@kaiafay.com>"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    )
  }
  if (!NOTIFY_EMAIL) {
    return NextResponse.json(
      { error: "Notification email is not configured." },
      { status: 500 }
    )
  }

  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const email = typeof body.email === "string" ? body.email.trim() : ""
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    )
  }

  const timestamp = new Date().toISOString()

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_EMAIL],
    subject: "New Budget Buddy signup",
    text: `New signup received.\n\nEmail: ${email}\nTime: ${timestamp}`,
    html: `<p>New Budget Buddy signup.</p><table><tr><td><strong>Email</strong></td><td>${email}</td></tr><tr><td><strong>Time</strong></td><td>${timestamp}</td></tr></table>`,
  })

  if (error) {
    console.error("[budget-buddy-signup] Resend error:", error)
    return NextResponse.json(
      { error: "Failed to record signup. Please try again." },
      { status: 500 }
    )
  }

  console.log("[budget-buddy-signup] New signup recorded")

  return NextResponse.json({ success: true })
}
