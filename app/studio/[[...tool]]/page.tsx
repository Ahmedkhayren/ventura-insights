"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityConfigured } from "@/lib/sanity/env";

export default function StudioPage() {
  if (!sanityConfigured) return <main style={{ padding: 40, fontFamily: "sans-serif" }}><h1>Connect Sanity Studio</h1><p>Add your project ID and dataset to <code>.env.local</code>, then restart the development server.</p></main>;
  return <NextStudio config={config} />;
}
