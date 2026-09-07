import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { LatestInsights } from "@/components/home/LatestInsights";
import { ProofStrip } from "@/components/home/ProofStrip";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StructuredData } from "@/components/seo/StructuredData";
import { getArticles } from "@/lib/sanity/fetch";
import { organizationJsonLd } from "@/lib/seo/structured-data";

export default async function HomePage() {
  const articles = await getArticles();
  return <><StructuredData data={organizationJsonLd} /><Hero /><ProofStrip /><LatestInsights articles={articles} /><ServicesPreview /><CTA /></>;
}
