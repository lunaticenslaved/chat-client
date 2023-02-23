import { ViewerModel, AuthResponse } from "../types";

export type { ViewerModel, AuthResponse };

export interface Handlers<T = any> {
  onSuccess: (data: T) => any | Promise<any>;
  onError: (error: Error) => any | Promise<any>;
}
