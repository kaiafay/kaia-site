import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "kfscheirman18@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM ?? "Coaching Form <onboarding@resend.dev>";

type CoachingPayload = {
  fullName?: string;
  email?: string;
  age?: string;
  location?: string;
  trainingLength?: string;
  daysPerWeek?: string;
  trainingTypes?: string[];
  primaryGoal?: string;
  targetTimeline?: string;
  holdingBack?: string;
  injuries?: string;
  medicalConditions?: string;
  doctorOrSpecialist?: string;
  currentDiet?: string;
  dietaryRestrictions?: string;
  gymAccess?: string;
  monthlyBudget?: string;
  hearAbout?: string;
  anythingElse?: string;
};

function formatSection(title: string, entries: [string, string | undefined][]): string {
  const lines = entries
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => `  ${k}: ${v}`);
  if (lines.length === 0) return "";
  return "\n" + title + "\n" + lines.join("\n") + "\n";
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: CoachingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { fullName, email } = body;
  if (!fullName?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 }
    );
  }

  const trainingTypesStr =
    Array.isArray(body.trainingTypes) && body.trainingTypes.length > 0
      ? body.trainingTypes.join(", ")
      : undefined;

  function escapeHtml(s: string | undefined): string {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sectionHtml(
    title: string,
    entries: [string, string | undefined][]
  ): string {
    const rows = entries
      .filter(([, v]) => v != null && String(v).trim() !== "")
      .map(([k, v]) => {
        const keyCell = escapeHtml(k);
        const valCell = escapeHtml(String(v));
        return "<tr><td style=\"padding: 6px 12px 6px 0; vertical-align: top; color: #666;\">" + keyCell + "</td><td style=\"padding: 6px 0;\">" + valCell + "</td></tr>";
      });
    if (rows.length === 0) return "";
    return "\n  <h2 style=\"font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8f3848; margin: 20px 0 8px;\">" + escapeHtml(title) + "</h2>\n  <table style=\"width: 100%; border-collapse: collapse;\">" + rows.join("") + "</table>\n  ";
  }

  const text = [
    "New coaching application from kaia.dev",
    "—".repeat(40),
    formatSection("Contact & Basics", [
      ["Full name", fullName],
      ["Email", email],
      ["Age", body.age],
      ["Location", body.location],
    ]),
    formatSection("Training Background", [
      ["How long training", body.trainingLength],
      ["Days per week", body.daysPerWeek],
      ["Types of training", trainingTypesStr],
    ]),
    formatSection("Goals", [
      ["Primary goal", body.primaryGoal],
      ["Target timeline", body.targetTimeline],
      ["What's holding you back", body.holdingBack],
    ]),
    formatSection("Health & Safety", [
      ["Injuries / limitations", body.injuries],
      ["Medical conditions", body.medicalConditions],
      ["Working with doctor/specialist", body.doctorOrSpecialist],
    ]),
    formatSection("Nutrition", [
      ["Current diet", body.currentDiet],
      ["Dietary restrictions / allergies", body.dietaryRestrictions],
    ]),
    formatSection("Logistics", [
      ["Gym access", body.gymAccess],
      ["Monthly coaching budget", body.monthlyBudget],
      ["How did you hear about Kaia", body.hearAbout],
      ["Anything else", body.anythingElse],
    ]),
  ]
    .join("")
    .trim();

  const html =
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Coaching application: " +
    escapeHtml(fullName) +
    "</title></head><body style=\"font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;\">" +
    "<h1 style=\"font-size: 1.25rem; color: #8f3848;\">New coaching application</h1>" +
    "<p style=\"color: #666;\">From " +
    escapeHtml(fullName) +
    " &lt;" +
    escapeHtml(email) +
    "&gt;</p>" +
    "<hr style=\"border: none; border-top: 1px solid #eee; margin: 24px 0;\" />" +
    sectionHtml("Contact & Basics", [
      ["Full name", fullName],
      ["Email", email],
      ["Age", body.age],
      ["Location", body.location],
    ]) +
    sectionHtml("Training Background", [
      ["How long training", body.trainingLength],
      ["Days per week", body.daysPerWeek],
      ["Types of training", trainingTypesStr],
    ]) +
    sectionHtml("Goals", [
      ["Primary goal", body.primaryGoal],
      ["Target timeline", body.targetTimeline],
      ["What's holding you back", body.holdingBack],
    ]) +
    sectionHtml("Health & Safety", [
      ["Injuries / limitations", body.injuries],
      ["Medical conditions", body.medicalConditions],
      ["Working with doctor/specialist", body.doctorOrSpecialist],
    ]) +
    sectionHtml("Nutrition", [
      ["Current diet", body.currentDiet],
      ["Dietary restrictions / allergies", body.dietaryRestrictions],
    ]) +
    sectionHtml("Logistics", [
      ["Gym access", body.gymAccess],
      ["Monthly coaching budget", body.monthlyBudget],
      ["How did you hear about Kaia", body.hearAbout],
      ["Anything else", body.anythingElse],
    ]) +
    "</body></html>";

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: "Coaching application: " + fullName,
    text,
    html,
  });

  if (error) {
    console.error("[coaching] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: data?.id });
}
