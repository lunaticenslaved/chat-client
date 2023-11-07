import { API } from "@/shared/api";

import { DialogModel } from "./types";

export type GetDialogsResponse = {
  dialogs: DialogModel[];
};

function getDialogs() {
  return API.request<GetDialogsResponse>("/api/dialogs", {
    method: "GET",
  });
}

export const DialogsAPI = {
  getDialogs,
};
