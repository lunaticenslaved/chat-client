import { ViewerAPI } from "@/entities/viewer";
import { Handlers } from "@/shared/types";
import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";

export type UseRepeatConfirmEmailRequest = Handlers;

export type UseRepeatConfirmEmailResponse = {
  repeatEmail(): Promise<void>;
  isLoading: boolean;
};

export function useRepeatConfirmEmail({
  onError,
  onSuccess,
}: UseRepeatConfirmEmailRequest): UseRepeatConfirmEmailResponse {
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: "repeat-confirm-email",
    mutationFn: ViewerAPI.repeatConfirmMail,
  });

  const repeatEmail = useCallback(async () => {
    try {
      await mutateAsync();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [mutateAsync, onError, onSuccess]);

  return useMemo(
    () => ({
      isLoading,
      repeatEmail,
    }),
    [isLoading, repeatEmail]
  );
}
