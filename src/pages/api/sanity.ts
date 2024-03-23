import type { APIRoute } from "astro";

const isProd = import.meta.env.PROD;
const sanity = import.meta.env.SANITY;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ isProd, sanity }), {
    headers: { "content-type": "application/json" },
  });
};
