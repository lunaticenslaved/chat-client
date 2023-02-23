import { $api } from "shared/api";

import { AuthResponse, Handlers } from "./_types";

export interface RegisterPayload extends Handlers<AuthResponse> {
  data: {
    name: string;
    email: string;
    password: string;
  };
}

export const register = async (payload: RegisterPayload) => {
  try {
    const res = await $api.post<AuthResponse>("/register", payload.data);
    payload.onSuccess(res.data);
  } catch (error) {
    console.error(error);
    payload.onError(error as Error);
  }
};
