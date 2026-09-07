import { NextResponse } from "next/server";

type ContactPayload = { name?: string; email?: string; company?: string; subject?: string; message?: string };

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!data?.name || !data.email || !data.subject || !data.message || !/^\S+@\S+\.\S+$/.test(data.email) || data.message.length < 20) return NextResponse.json({ message: "Please complete all required fields with a valid email." }, { status: 400 });
  if (!process.env.CONTACT_WEBHOOK_URL) return NextResponse.json({ message: "The form is ready, but an email provider has not been connected. Please email hello@venturainsights.example." }, { status: 503 });
  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ message: "The message could not be delivered. Please try again or email us directly." }, { status: 502 });
  return NextResponse.json({ message: "Thank you. Your message has been sent." });
}
