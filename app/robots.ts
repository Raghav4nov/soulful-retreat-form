import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/test", "/api"],
    },
    sitemap: "https://soulfulhealingadventure.com/sitemap.xml",
  };
}
