import { createAsyncThunk } from "@reduxjs/toolkit";

import { axios } from "shared/api";

import { DialogModel } from "./types";

// FIXME: обработать ошибку

export const fetchDialogs = createAsyncThunk(
  "dialogs/fetchDialogs",
  async () => {
    try {
      const response = await axios.get<DialogModel[]>("/my-dialogs");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
);
