import type { MetadataRoute } from "next";
import { absoluteUrl } from "../src/lib/seo";

const routes = ["/", "/about", "/work", "/bio"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
