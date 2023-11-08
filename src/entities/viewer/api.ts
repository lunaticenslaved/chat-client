import jwtDecode from "jwt-decode";

import { ViewerModel } from "@/entities/viewer/types";
import { apiSlice } from "@/shared/api";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: ViewerModel;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: ViewerModel;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<ViewerModel, SignInRequest>({
      query: (body) => ({ url: "/auth/login", body, method: "POST" }),
      transformResponse: (res: SignInResponse) => res.user,
    }),

    // TODO: return access token, not user
    signUp: build.mutation<ViewerModel, SignUpRequest>({
      query: (body) => ({ url: `/auth/register`, body, method: "POST" }),
      transformResponse: (res: SignUpResponse) => res.user,
    }),

    refresh: build.mutation<ViewerModel, void>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
      transformResponse: (res: SignInResponse) => res.user,
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),

    repeatConfirmMail: build.mutation<void, void>({
      query: () => ({ url: `/auth/repeat-confirm-email`, method: "POST" }),
    }),

    activateAccount: build.mutation<void, void>({
      query: () => ({ url: `/auth/activate/:link`, method: "POST" }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useRefreshMutation,
  useLogoutMutation,
  useRepeatConfirmMailMutation,
  useActivateAccountMutation,
} = authApiSlice;
