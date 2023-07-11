import { lazy } from "react";

const SignInPage = lazy(() => import("pages/auth/sign-in"));
const SignUpPage = lazy(() => import("pages/auth/sign-up"));
const SignUpConfirmRequiredPage = lazy(() => import("pages/auth/confirm-required"));
const SignUpConfirmSuccessPage = lazy(() => import("pages/auth/confirm-success"));
const ChatPage = lazy(() => import("pages/chat"));
const PageNotFound = lazy(() => import("pages/not-found"));

export enum PageAccessType {
  PrivateCommon = "private-common",
  PrivateConfirmed = "private-confirmed",
  Public = "public",
  Common = "common",
}

export const PAGES = [
  {
    path: "/",
    component: ChatPage,
    accessType: PageAccessType.PrivateConfirmed,
  },
  {
    path: "/sign-in",
    component: SignInPage,
    accessType: PageAccessType.Public,
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    accessType: PageAccessType.Public,
  },
  {
    path: "/confirm-email",
    component: SignUpConfirmRequiredPage,
    accessType: PageAccessType.PrivateCommon,
  },
  {
    path: "/activate/:link",
    component: SignUpConfirmSuccessPage,
    accessType: PageAccessType.PrivateCommon,
  },
  {
    path: "/*",
    component: PageNotFound,
    accessType: PageAccessType.Common,
  },
];
