import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 10_000;
const MAX_SLUG_LENGTH = 96;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type WebhookPayload = Record<string, unknown>;

function logRevalidation(event: string, details: Record<string, unknown> = {}) {
  console.info("[sanity-revalidate]", {
    event,
    timestamp: new Date().toISOString(),
    ...details,
  });
}

function secretsMatch(provided: string | null, expected: string | undefined) {
  if (!provided || !expected) return false;
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes);
}

function optionalSlug(payload: WebhookPayload, key: "slug" | "beforeSlug" | "afterSlug") {
  const candidate = payload[key];
  if (candidate === undefined || candidate === null) return undefined;
  if (typeof candidate !== "string" || candidate.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(candidate)) {
    throw new Error("Invalid slug");
  }
  return candidate;
}

export async function POST(request: NextRequest) {
  logRevalidation("request_received");

  const secret = request.headers.get("x-sanity-secret");
  if (!secretsMatch(secret, process.env.SANITY_REVALIDATE_SECRET)) {
    logRevalidation("authentication_rejected");
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  logRevalidation("authentication_accepted");

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    logRevalidation("payload_rejected", { reason: "body_too_large" });
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const raw = await request.text().catch(() => "");
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    logRevalidation("payload_rejected", { reason: "body_too_large" });
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  let beforeSlug: string | undefined;
  let afterSlug: string | undefined;
  let legacySlug: string | undefined;
  if (raw) {
    try {
      const payload: unknown = JSON.parse(raw);
      if (typeof payload !== "object" || payload === null || Array.isArray(payload)) throw new Error("Invalid payload");
      const webhookPayload = payload as WebhookPayload;
      beforeSlug = optionalSlug(webhookPayload, "beforeSlug");
      afterSlug = optionalSlug(webhookPayload, "afterSlug");
      legacySlug = optionalSlug(webhookPayload, "slug");
    } catch {
      logRevalidation("payload_rejected", { reason: "invalid_json_or_slug" });
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }
  }

  const slugs = [...new Set([beforeSlug, afterSlug, legacySlug].filter((slug): slug is string => Boolean(slug)))];
  const tags = ["articles", ...slugs.map((slug) => `article:${slug}`)];
  const paths = ["/", "/insights", ...slugs.map((slug) => `/insights/${slug}`)];

  try {
    for (const tag of tags) revalidateTag(tag, { expire: 0 });
    for (const path of paths) revalidatePath(path);
  } catch (error) {
    console.error("[sanity-revalidate]", {
      event: "revalidation_failed",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }

  logRevalidation("cache_invalidated", { beforeSlug, afterSlug, legacySlug, tags, paths });
  return NextResponse.json({ revalidated: true, now: Date.now(), tags, paths });
}
