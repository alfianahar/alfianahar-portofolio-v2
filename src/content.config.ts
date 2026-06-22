import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      tags: z.array(z.string()),
      role: z.string(),
      position: z.array(z.string()),
      type: z.string(),
      stack: z.array(z.string()),
      cover: image(),
      coverAlt: z.string(),
      outcome: z.string().optional(),
      year: z.number().optional(),
      status: z.string().optional(),
      featured: z.boolean().optional(),
      order: z.number().optional(),
      links: z
        .object({
          live: z.string().url().optional(),
          repo: z.string().url().optional(),
          caseStudy: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
