import { NextResponse } from "next/server"

export async function POST(request: Request) {
  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { email } = body
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
  }

  console.log("[budget-buddy-signup] New signup:", email)

  return NextResponse.json({ success: true })
}
