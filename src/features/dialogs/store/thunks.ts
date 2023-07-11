import { createAsyncThunk } from "@reduxjs/toolkit";

import { $api } from "shared/api";

import { DialogModel } from "./types";

// FIXME: обработать ошибку

export const fetchDialogs = createAsyncThunk("dialogs/fetchDialogs", async () => {
  const response = await $api.get<DialogModel[]>("/my-dialogs");

  return response.data;
});
