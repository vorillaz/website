import { db, Views } from "astro:db";

export default async function () {
  await db.insert(Views).values([
    {
      slug: "sanity",
      count: 100,
    },
  ]);
}
