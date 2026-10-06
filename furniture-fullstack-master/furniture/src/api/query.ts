import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import api from ".";
import type { Post, Product } from "@/types";

type CursorPage = {
  nextCursor?: number | null;
};

type InfinitePostsResponse = CursorPage & {
  posts: Post[];
};

type InfiniteProductsResponse = CursorPage & {
  products: Product[];
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      // retry: 2,
    },
  },
});

import {
  fallbackProducts,
  fallbackPosts,
  fallbackCategories,
  fallbackTypes,
} from "@/data/mockData";

const fetchProducts = (q?: string) =>
  api
    .get(`users/products${q ?? ""}`)
    .then((res) => {
      const data = res.data;
      if (!data || !data.products || data.products.length === 0) {
        return { products: fallbackProducts, nextCursor: null };
      }
      return data;
    })
    .catch((err) => {
      console.warn("fetchProducts error:", err);
      return { products: fallbackProducts, nextCursor: null };
    });

export const productQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProducts(q),
});

const fetchPosts = (q?: string) =>
  api
    .get(`users/posts/infinite${q ?? ""}`)
    .then((res) => {
      const data = res.data;
      if (!data || !data.posts || data.posts.length === 0) {
        return { posts: fallbackPosts, nextCursor: null };
      }
      return data;
    })
    .catch((err) => {
      console.warn("fetchPosts error:", err);
      return { posts: fallbackPosts, nextCursor: null };
    });

export const postQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

const fetchInfinitePosts = async ({
  pageParam = null,
}: {
  pageParam?: number | null;
}): Promise<InfinitePostsResponse> => {
  try {
    const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
    const response = await api.get(`users/posts/infinite${query}`);
    if (
      !response.data ||
      !response.data.posts ||
      response.data.posts.length === 0
    ) {
      return { posts: fallbackPosts, nextCursor: null };
    }
    return response.data;
  } catch (err) {
    console.warn("fetchInfinitePosts error:", err);
    return { posts: fallbackPosts, nextCursor: null };
  }
};

export const postInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null, // Start with no cursor
  getNextPageParam: (lastPage: InfinitePostsResponse) =>
    lastPage?.nextCursor ?? undefined,
  // getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor ?? undefined,
  // maxPages: 7,
});

const fetchOnePost = async (id: number) => {
  try {
    const post = await api.get(`users/posts/${id}`);
    if (post && post.data && post.data.post) {
      return post.data;
    }
  } catch (err) {
    console.warn("fetchOnePost error:", err);
  }
  const found =
    fallbackPosts.find((p) => p.id === Number(id)) || fallbackPosts[0];
  return {
    post: {
      ...found,
      author: found.author || { fullName: "Phyo Zin Ko" },
      tags: found.tags || [{ name: "Furniture" }],
    },
  };
};

export const onePostQuery = (id: number) => ({
  queryKey: ["posts", "detail", id],
  queryFn: () => fetchOnePost(id),
});

const fetchCategoryType = async () =>
  api
    .get("users/filter-type")
    .then((res) => {
      if (
        !res.data ||
        (!res.data.categories?.length && !res.data.types?.length)
      ) {
        return { categories: fallbackCategories, types: fallbackTypes };
      }
      return res.data;
    })
    .catch((err) => {
      console.warn("fetchCategoryType error:", err);
      return { categories: fallbackCategories, types: fallbackTypes };
    });

export const categoryTypeQuery = () => ({
  queryKey: ["category", "type"],
  queryFn: fetchCategoryType,
});

const filterFallbackProducts = (
  categories?: string | null,
  types?: string | null,
) => {
  let filtered = [...fallbackProducts];
  if (categories) {
    const catList = categories.split(",").map((c) => c.trim());
    filtered = filtered.filter((p) => catList.includes(String(p.categoryId)));
  }
  if (types) {
    const typeList = types.split(",").map((t) => t.trim());
    filtered = filtered.filter((p) => p.typeId && typeList.includes(String(p.typeId)));
  }
  return filtered;
};

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}): Promise<InfiniteProductsResponse> => {
  try {
    let query = pageParam ? `?limit=9&cursor=${pageParam}` : "?limit=9";
    if (categories) query += `&category=${categories}`;
    if (types) query += `&type=${types}`;
    const response = await api.get(`users/products${query}`);
    if (
      !response.data ||
      !response.data.products ||
      response.data.products.length === 0
    ) {
      return { products: filterFallbackProducts(categories, types), nextCursor: null };
    }
    return response.data;
  } catch (err) {
    console.warn("fetchInfiniteProducts error:", err);
    return { products: filterFallbackProducts(categories, types), nextCursor: null };
  }
};

export const productInfiniteQuery = (
  categories: string | null = null,
  types: string | null = null,
) => ({
  queryKey: [
    "products",
    "infinite",
    categories ?? undefined,
    types ?? undefined,
  ],
  queryFn: ({ pageParam }: { pageParam?: number | null }) =>
    fetchInfiniteProducts({ pageParam, categories, types }),
  placeholderData: keepPreviousData,
  initialPageParam: null, // Start with no cursor
  getNextPageParam: (lastPage: InfiniteProductsResponse) =>
    lastPage.nextCursor ?? undefined,
  // getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor ?? undefined,
  // maxPages: 7,
});

const fetchOneProduct = async (id: number) => {
  try {
    const product = await api.get(`users/products/${id}`);
    if (product && product.data && product.data.product) {
      return product.data;
    }
  } catch (err) {
    console.warn("fetchOneProduct error:", err);
  }
  const found =
    fallbackProducts.find((p) => p.id === Number(id)) || fallbackProducts[0];
  return {
    product: {
      ...found,
      users: [],
    },
  };
};

export const oneProductQuery = (id: number) => ({
  queryKey: ["products", "detail", id],
  queryFn: () => fetchOneProduct(id),
});
