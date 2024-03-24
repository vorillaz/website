import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export interface PastTalks {
  year: number;
  talks: CollectionEntry<"talks">[];
}

export async function getTalks(): Promise<{
  upcoming: CollectionEntry<"talks">[];
  past: PastTalks[];
}> {
  const talks = (await getCollection("talks")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const upcoming = talks.filter((talk) => talk.data.upcoming);
  const p = talks.filter((talk) => !talk.data.upcoming);

  const past = p.reduce((acc: PastTalks[], talk) => {
    const year = talk.data.date.getFullYear();
    const f = acc.find((a) => a.year === year);
    if (f) {
      f.talks.push(talk);
    } else {
      acc.push({ year, talks: [talk] });
    }
    return acc;
  }, []);

  return { upcoming, past: past };
}
