import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "vorillaz.com",
    description: "A blog about web development and design",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/${post.slug}`,
      pubDate: post.data.pubDate,
    })),
  });
}
