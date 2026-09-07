import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types/content";
import { dataset, projectId, sanityConfigured } from "./env";

const builder = sanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(source?: SanityImage | string, width = 1400, height?: number) {
  if (!source) return "/images/architecture.png";
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;
  if (!builder || !source.asset?._ref) return "/images/architecture.png";
  const request = builder.image(source).auto("format").fit("crop").width(width);
  return height ? request.height(height).url() : request.url();
}
