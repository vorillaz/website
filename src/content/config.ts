import { defineCollection, z } from "astro:content";

const talks = defineCollection({
  schema: z.object({
    title: z.string(),
    country: z.string(),
    city: z.string().optional(),
    date: z.date(),
    upcoming: z.boolean().optional().default(false),
    url: z.string().optional(),
    conference: z.string().optional(),
    previewVideoUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    ticketUrl: z.string().optional(),
    slides: z.string().optional(),
    lang: z.enum(["en", "gr"]).optional(),
  }),
});

const generative = defineCollection({
  schema: z.object({
    title: z.string(),
    status: z.enum(["draft", "published"]).optional(),
    path: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    categories: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    description: z.string().optional(),
    fork: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  }),
});

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaDescription: z.string().optional(),
    heroImage: z.string().optional(),
    prompt: z.string().optional(),
    heroImageGenerator: z.enum(["unsplash", "midjourney"]).optional(),
    categories: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    status: z.enum(["draft", "published"]).optional(),
    imgCredits: z
      .object({
        username: z.string().optional(),
        url: z.string().optional(),
      })
      .optional(),

    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

const category = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { blog, generative, talks, category };
