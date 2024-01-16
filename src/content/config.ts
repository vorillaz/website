import { defineCollection, z } from "astro:content";

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
    excerpt: z.string().optional(),
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
    heroImage: z.string().optional(),
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

export const collections = { blog, generative };
