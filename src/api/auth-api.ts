import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwtDecode from "jwt-decode";

import { ViewerModel } from "features/viewer/types";
import { BASE_URL } from "shared/config";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  accessToken: string;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (build) => ({
    signIn: build.mutation<ViewerModel, SignInRequest>({
      query: (body) => ({ url: `/login`, body }),
      transformResponse: ({ data }: { data: SignInResponse }) => {
        localStorage.setItem("token", data.accessToken);

        return jwtDecode(data.accessToken) as ViewerModel;
      },
      transformErrorResponse: () => new Error("Sign in error"),
    }),

    // TODO: return access token, not user
    signUp: build.mutation<ViewerModel, SignUpRequest>({
      query: (body) => ({ url: `/register`, body }),
      transformResponse: ({ data }: { data: SignUpResponse }) => {
        localStorage.setItem("token", data.accessToken);

        return jwtDecode(data.accessToken) as ViewerModel;
      },
      transformErrorResponse: () => new Error("Sign up error"),
    }),

    refresh: build.mutation<ViewerModel, void>({ 
      query: () => ({ url: `/refresh` }),
      transformResponse: ({ data }: { data: SignInResponse }) => {
        localStorage.setItem("token", data.accessToken);

        return jwtDecode(data.accessToken) as ViewerModel;
      },
      transformErrorResponse: () => {
        localStorage.removeItem("token");

        return new Error("Refresh error");
      },
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: `/logout` }),
      transformResponse: () => {
        localStorage.removeItem("token");
      },
      transformErrorResponse: () => {
        return new Error("Logout error");
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
