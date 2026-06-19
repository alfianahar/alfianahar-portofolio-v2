import type { Metadata } from "next";
import { profile } from "@content/profile";

export const siteConfig = {
  name: "Alfian Nahar",
  title: "Alfian Nahar | AI Developer & Designer",
  description:
    "Personal portfolio of Alfian Nahar, focused on AI-powered products, modern web applications, and polished digital interfaces.",
  url: profile.website,
  ogImage: "/opengraph-image",
  locale: "en_US",
};

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
}: PageMetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: "%s | Alfian Nahar",
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Alfian Nahar portfolio preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
