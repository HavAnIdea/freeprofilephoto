import type { MetadataRoute } from "next";

const BASE = "https://freeprofilephoto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "/",
    "/funny",
    "/cute",
    "/cool",
    "/anime",
    "/size",
    "/blank",
    "/privacy",
    "/terms",
    "/contact",
    "/about",
    "/blog",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

