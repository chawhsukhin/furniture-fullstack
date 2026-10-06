import { authApi } from "@/api";
import {
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
  onePostQuery,
  categoryTypeQuery,
  productInfiniteQuery,
  oneProductQuery,
} from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect, type LoaderFunctionArgs } from "react-router";

export const homeLoader = async () => {
  try {
    await queryClient.ensureQueryData(productQuery("?limit=8"));
    await queryClient.ensureQueryData(postQuery("?limit=3"));
  } catch (err) {
    console.warn("homeLoader query warning:", err);
  }
  return null;
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("Loader error:", error);
    return null;
  }
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }

  return null;
};

export const confirmLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }

  return null;
};

export const verifyLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.verify) {
    return redirect("/reset");
  }

  return null;
};

export const newPasswordLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.reset) {
    return redirect("/reset");
  }

  return null;
};

// Guard: user must be logged in to access change-password page
export const changePasswordLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status === 200) {
      return null; // User is authenticated, allow access
    }
    return redirect("/login?redirect=/change-password");
  } catch {
    return redirect("/login?redirect=/change-password");
  }
};

export const blogInfiniteLoader = async () => {
  try {
    await queryClient.ensureInfiniteQueryData(postInfiniteQuery());
  } catch (err) {
    console.warn("blogInfiniteLoader warning:", err);
  }
  return null;
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("No Post ID provided");
  }
  try {
    await queryClient.ensureQueryData(postQuery("?limit=6"));
    await queryClient.ensureQueryData(onePostQuery(Number(params.postId)));
  } catch (err) {
    console.warn("postLoader warning:", err);
  }
  return { postId: params.postId };
};

export const productInfiniteLoader = async () => {
  try {
    await queryClient.ensureQueryData(categoryTypeQuery());
    await queryClient.prefetchInfiniteQuery(productInfiniteQuery());
  } catch (err) {
    console.warn("productInfiniteLoader warning:", err);
  }
  return null;
};

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.productId) {
    throw new Error("No Product ID provided");
  }
  try {
    await queryClient.ensureQueryData(productQuery("?limit=4"));
    await queryClient.ensureQueryData(oneProductQuery(Number(params.productId)));
  } catch (err) {
    console.warn("productLoader warning:", err);
  }
  return { productId: params.productId };
};
