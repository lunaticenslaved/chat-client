import { useViewer } from "@/entities/viewer";
import { ViewerAPI } from "@/entities/viewer/api";
import { Handlers } from "@/shared/types";
import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";

export type UseSignUpRequest = Handlers;

export type UseSignUpResponse = {
  isLoading: boolean;
  signUp(values: ViewerAPI.SignUpRequest): Promise<void>;
};

export function useSignUp({ onError, onSuccess }: UseSignUpRequest = {}): UseSignUpResponse {
  const viewerHook = useViewer();
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: "sign-up",
    mutationFn: ViewerAPI.signUp,
  });

  const signUp = useCallback(
    async (data: ViewerAPI.SignUpRequest) => {
      try {
        const { user } = await mutateAsync(data);

        if (onSuccess) {
          viewerHook.setViewer(user);

          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
      }
    },
    [mutateAsync, onError, onSuccess, viewerHook]
  );

  return useMemo(
    () => ({
      isLoading,
      signUp,
    }),
    [isLoading, signUp]
  );
}
