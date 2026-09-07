import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  const payload = await request.json().catch(() => ({}));
  revalidateTag("articles", "max");
  revalidatePath("/");
  revalidatePath("/insights");
  if (payload.slug) { revalidateTag(`article:${payload.slug}`, "max"); revalidatePath(`/insights/${payload.slug}`); }
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
