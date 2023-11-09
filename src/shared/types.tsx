import type { ButtonProps as AntButtonProps } from "antd/lib/button";

export type SizeType = AntButtonProps["size"];

export interface Handlers<T = unknown> {
  onSuccess?: (data?: T) => Promise<void> | void;
  onError?: (error: Error) => Promise<void> | void;
}
