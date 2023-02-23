import { createAsyncThunk } from "@reduxjs/toolkit";

import { $api } from "shared/api";

import { DialogModel } from "./types";

// FIXME: обработать ошибку

export const fetchDialogs = createAsyncThunk(
  "dialogs/fetchDialogs",
  async () => {
    try {
      const response = await $api.get<DialogModel[]>("/my-dialogs");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
);
