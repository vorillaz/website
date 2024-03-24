import type { APIRoute } from "astro";
import { ogImage } from "@/lib/og";

export const GET: APIRoute = async ({ request }) => {
  // Get the title and description from the query params
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const data = {
    title: params.get("title"),
  };

  const { title } = data;

  return new Response(
    await ogImage({
      title: title as string,
    }),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
