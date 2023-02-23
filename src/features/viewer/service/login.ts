import { $api } from "shared/api";

import { AuthResponse, Handlers } from "./_types";

export interface LoginPayload extends Handlers<AuthResponse> {
  data: {
    email: string;
    password: string;
  };
}

export const login = async (payload: LoginPayload) => {
  try {
    const res = await $api.post<AuthResponse>("/login", {
      email: payload.data.email,
      password: payload.data.password,
    });
    payload.onSuccess(res.data);
  } catch (error) {
    console.error(error);
    payload.onError(error as Error);
  }
};
