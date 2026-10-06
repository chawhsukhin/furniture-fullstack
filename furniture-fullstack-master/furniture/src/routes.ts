import { createBrowserRouter, redirect } from "react-router";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";

import ProductRootLayout from "@/pages/products/ProductRootLayout";
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";
import LoginPage from "@/pages/auth/Login";

import {
  blogInfiniteLoader,
  changePasswordLoader,
  confirmLoader,
  homeLoader,
  loginLoader,
  newPasswordLoader,
  otpLoader,
  postLoader,
  productInfiniteLoader,
  productLoader,
  verifyLoader,
} from "@/router/loader";
import {
  changePasswordAction,
  confirmAction,
  favouriteAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  otpAction,
  registerAction,
  resetAction,
  verifyAction,
} from "@/router/action";
import ChangePasswordPage from "@/pages/auth/ChangePassword";
import AuthRootLayout from "@/pages/auth/AuthRootLayout";
import SignUpPage from "@/pages/auth/SignUp";
import OtpPage from "@/pages/auth/Otp";
import ConfirmPasswordPage from "@/pages/auth/ConfirmPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtpPage from "@/pages/auth/VerifyOtp";
import NewPasswordPage from "@/pages/auth/NewPassword";

import ServicesPage from "@/pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "services",
        Component: ServicesPage,
      },
      {
        path: "blogs",
        lazy: async () => {
          const mod = await import("@/pages/blog/BlogRootLayout");
          return { Component: mod.default };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const mod = await import("@/pages/blog/Blog");
              return { Component: mod.default, loader: blogInfiniteLoader };
            },
          },
          {
            path: ":postId",
            lazy: async () => {
              const mod = await import("@/pages/blog/BlogDetail");
              return { Component: mod.default, loader: postLoader };
            },
          },
        ],
      },
      {
        path: "products",
        Component: ProductRootLayout,
        children: [
          {
            index: true,
            Component: ProductPage,
            loader: productInfiniteLoader,
          },
          {
            path: ":productId",
            Component: ProductDetailPage,
            loader: productLoader,
            action: favouriteAction,
          },
        ],
      },
      {
        path: "change-password",
        Component: ChangePasswordPage,
        loader: changePasswordLoader,
        action: changePasswordAction,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: SignUpPage,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        Component: OtpPage,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        Component: ConfirmPasswordPage,
        loader: confirmLoader,
        action: confirmAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
  {
    path: "/reset",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: ResetPasswordPage,
        action: resetAction,
      },
      {
        path: "verify",
        Component: VerifyOtpPage,
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        Component: NewPasswordPage,
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
