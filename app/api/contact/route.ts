import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

function invalid(message = "Please complete all required fields with a valid email.") {
  return NextResponse.json({ message }, { status: 400 });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "The message is too large." }, { status: 413 });
  }

  const raw = await request.text().catch(() => "");
  if (!raw || new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "The message is too large or invalid." }, { status: 413 });
  }

  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return invalid();
  }
  if (!isRecord(input)) return invalid();

  const payload: ContactPayload = {
    name: readString(input.name) || "",
    email: readString(input.email) || "",
    company: readString(input.company) || "",
    subject: readString(input.subject) || "",
    message: readString(input.message) || "",
  };

  const invalidLengths = payload.name.length > 100 || payload.email.length > 254 || payload.company.length > 120 || payload.subject.length > 120 || payload.message.length > 5_000;
  if (!payload.name || !payload.email || !payload.subject || payload.message.length < 20 || invalidLengths || !EMAIL_PATTERN.test(payload.email)) return invalid();

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ message: "The form is ready, but an email provider has not been connected. Please email hello@venturainsights.example." }, { status: 503 });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return NextResponse.json({ message: "The message could not be delivered. Please try again or email us directly." }, { status: 502 });
  } catch {
    return NextResponse.json({ message: "The message could not be delivered. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ message: "Thank you. Your message has been sent." });
}
