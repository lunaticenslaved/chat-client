import jwtDecode from "jwt-decode";

import { ViewerModel } from "../types";

export const decodeViewer = (token: string | null = null) => {
  const t = token === null ? localStorage.getItem("token") : token;
  return t ? (jwtDecode(t) as ViewerModel) : null;
};
