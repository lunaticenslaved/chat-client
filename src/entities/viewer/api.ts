import { API } from "@/shared/api";

import { ViewerModel } from "./types";

export namespace ViewerAPI {
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

  export interface RefreshResponse {
    user: ViewerModel;
  }
}

export const ViewerAPI = {
  signIn(data: ViewerAPI.SignInRequest) {
    return API.request<ViewerAPI.SignInResponse>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  signUp(data: ViewerAPI.SignUpRequest) {
    return API.request<ViewerAPI.SignUpResponse>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  refresh() {
    return API.request<ViewerAPI.RefreshResponse>("/auth/refresh", {
      method: "POST",
    });
  },
  logout() {
    return API.request("/auth/logout", {
      method: "POST",
    });
  },
  repeatConfirmMail() {
    return API.request("/auth/repeat-confirm-email", {
      method: "POST",
    });
  },
  activateAccount() {
    return API.request("/auth/activate/:link", {
      method: "POST",
    });
  },
};
