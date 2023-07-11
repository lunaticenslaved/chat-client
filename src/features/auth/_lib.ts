export interface Handlers<T = unknown> {
  onSuccess?: (data?: T) => Promise<void> | void;
  onError?: (error: Error) => Promise<void> | void;
}
