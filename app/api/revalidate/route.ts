import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 10_000;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function secretsMatch(provided: string | null, expected: string | undefined) {
  if (!provided || !expected) return false;
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return providedBytes.length === expectedBytes.length && timingSafeEqual(providedBytes, expectedBytes);
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-secret");
  if (!secretsMatch(secret, process.env.SANITY_REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const raw = await request.text().catch(() => "");
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  let slug: string | undefined;
  if (raw) {
    try {
      const payload: unknown = JSON.parse(raw);
      if (typeof payload !== "object" || payload === null || Array.isArray(payload)) throw new Error("Invalid payload");
      const candidate = (payload as Record<string, unknown>).slug;
      if (candidate !== undefined) {
        if (typeof candidate !== "string" || candidate.length > 96 || !SLUG_PATTERN.test(candidate)) throw new Error("Invalid slug");
        slug = candidate;
      }
    } catch {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }
  }

  revalidateTag("articles", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/insights");
  if (slug) {
    revalidateTag(`article:${slug}`, { expire: 0 });
    revalidatePath(`/insights/${slug}`);
  }
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
