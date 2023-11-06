import { ROUTES } from "@/config/routes";
import { lazy } from "react";

const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const SignUpConfirmRequiredPage = lazy(() => import("@/pages/auth/confirm-required"));
const SignUpConfirmSuccessPage = lazy(() => import("@/pages/auth/confirm-success"));
const ChatPage = lazy(() => import("@/pages/chat"));
const PageNotFound = lazy(() => import("@/pages/not-found"));

export enum PageAccessType {
  PrivateCommon = "private-common",
  PrivateConfirmed = "private-confirmed",
  Public = "public",
  Common = "common",
}

export const PAGES = [
  {
    path: ROUTES.home,
    component: ChatPage,
    accessType: PageAccessType.PrivateConfirmed,
  },
  {
    path: ROUTES.auth.signIn,
    component: SignInPage,
    accessType: PageAccessType.Public,
  },
  {
    path: ROUTES.auth.signUp,
    component: SignUpPage,
    accessType: PageAccessType.Public,
  },
  {
    path: ROUTES.auth.confirmEmailRequired,
    component: SignUpConfirmRequiredPage,
    accessType: PageAccessType.PrivateCommon,
  },
  {
    path: ROUTES.auth.confirmEmailActivate,
    component: SignUpConfirmSuccessPage,
    accessType: PageAccessType.PrivateCommon,
  },
  {
    path: ROUTES.error404,
    component: PageNotFound,
    accessType: PageAccessType.Common,
  },
];
