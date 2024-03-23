import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const postPerPage = 8;
interface GetPaginationProps<T> {
  posts: T;
  page: string | number;
  isIndex?: boolean;
}

export async function getCategories() {
  const posts = await getCollection("blog");

  const categories = [
    ...new Set([].concat.apply(posts.map((post) => post.data.categories))),
  ];

  return categories;
}

export async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return posts;
}

export async function getArt() {
  const art = (await getCollection("generative")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return art;
}

export async function getPostsByCategory(category: string) {
  const posts = (await getCollection("blog"))
    .filter((post) => {
      return post.data.categories && post.data.categories.includes(category);
    })
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return posts;
}

export const getLatestPost = async () => {
  const posts = await getPosts();
  return posts[0];
};

export const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(postPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export const getPagination = <T>({
  posts,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
    ? Number(page)
    : 0;

  const lastPost = isIndex ? postPerPage : currentPage * postPerPage;
  const startPost = isIndex ? 0 : lastPost - postPerPage;
  const paginatedPosts = posts.slice(startPost, lastPost) as T[];

  return {
    totalPages,
    currentPage,
    paginatedPosts,
  };
};

export const getSortedPosts = (
  posts: CollectionEntry<"blog">[] | CollectionEntry<"generative">[]
) => {
  return posts
    .filter(({ data }) => !data.status || data.status === "published")
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.pubDate ?? b.data.pubDate).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.updatedDate ?? a.data.pubDate).getTime() / 1000
        )
    );
};
