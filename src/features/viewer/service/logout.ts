import { $api } from "shared/api";
import { Handlers } from "./_types";

export interface LogoutPayload extends Handlers {}

export const logout = async (payload: LogoutPayload) => {
  try {
    await $api.post("/logout");
    payload.onSuccess(null);
  } catch (error) {
    console.error(error);
    payload.onError(error as Error);
  }
};
