import { API } from "@/shared/api";
import { Operation } from "@lunaticenslaved/schema";

import { client } from "@/shared/client";

import { ViewerModel } from "./types";

export namespace ViewerAPI {
  export type SignInRequest = Operation.Auth.SignInRequest;
  export type SignInResponse = Operation.Auth.SignInResponse;

  export type SignUpRequest = Operation.Auth.SignUpRequest;
  export type SignUpResponse = Operation.Auth.SignUpResponse;

  export interface RefreshResponse {
    user: ViewerModel;
  }
}

export const ViewerAPI = {
  async signIn(data: ViewerAPI.SignInRequest): Promise<ViewerAPI.SignInResponse> {
    const response = await Operation.Auth.SignIn.action({
      data,
    }).then(client.unwrapOperation);

    client.setToken(response.token);

    return response;
  },
  async signUp(data: ViewerAPI.SignUpRequest): Promise<ViewerAPI.SignUpResponse> {
    const response = await Operation.Auth.SignUp.action({
      data,
    }).then(client.unwrapOperation);

    client.setToken(response.token);

    return response;
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
