import { API } from "@/shared/api";

import { DialogModel } from "./types";

export type GetDialogsResponse = {
  dialogs: DialogModel[];
};

export const DialogsAPI = {
  getDialogs() {
    return API.request<GetDialogsResponse>("/api/dialogs", {
      method: "GET",
    });
  },
};
