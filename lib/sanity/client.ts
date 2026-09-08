import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "published",
    })
  : null;
