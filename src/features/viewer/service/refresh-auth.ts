import { $apiWithoutErrorInterceptor as $api } from "shared/api";

import { AuthResponse, Handlers } from "./_types";

export const refreshAuth = async (payload: Handlers<AuthResponse>) => {
  try {
    const res = await $api.post<AuthResponse>("/refresh");
    payload.onSuccess(res.data);
  } catch (error) {
    console.error(error);
    payload.onError(error as Error);
  }
};
