import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { ViewerAPI, useViewer } from "@/entities/viewer";
import { Handlers } from "@/shared/types";
import { ROUTES } from "@/config/routes";

export type UseSignInRequest = Handlers;

export type UseSignInResponse = {
  isLoading: boolean;
  signIn(values: ViewerAPI.SignInRequest): Promise<void>;
};

export function useSignIn({ onError, onSuccess }: UseSignInRequest): UseSignInResponse {
  const viewerHook = useViewer();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: "sign-in",
    mutationFn: ViewerAPI.signIn,
  });

  const signIn = useCallback(
    async (values: ViewerAPI.SignInRequest) => {
      try {
        const { user } = await mutateAsync({
          login: values.login,
          password: values.password,
        });

        viewerHook.setViewer(user);

        if (user.isActivated) {
          navigate(ROUTES.home, {});
        } else {
          navigate(ROUTES.auth.confirmEmailRequired);
        }

        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
      }
    },
    [mutateAsync, navigate, onError, onSuccess, viewerHook]
  );

  return useMemo(
    () => ({
      isLoading,
      signIn,
    }),
    [isLoading, signIn]
  );
}
