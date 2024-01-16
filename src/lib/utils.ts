export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const slugifyAll = (arr: string[]) => arr.map((str) => slugify(str));
