import { useMutation } from "react-query";

import { MessageAPI } from "../api";
import { useMemo } from "react";

export type UseMessageResponse = {
  isLoading: boolean;
  isError: boolean;
  createMessage(data: MessageAPI.CreateMessageRequest): void;
};

export function useMessage(): UseMessageResponse {
  const { mutate, isLoading, isError } = useMutation({
    mutationKey: "create-message",
    mutationFn: MessageAPI.createMessage,
  });

  return useMemo(
    () => ({
      isLoading,
      isError,
      createMessage: mutate,
    }),
    [isError, isLoading, mutate]
  );
}
