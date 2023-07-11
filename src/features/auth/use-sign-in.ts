import { useCallback } from "react";

import { SignInRequest, useSignInMutation } from "api/auth-api";

import { Handlers } from "./_lib";
import { useAppDispatch } from "shared/hooks";
import { viewerActions } from "features/viewer/store";

export const useSignIn = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeSignIn, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    async (data: SignInRequest) => {
      try {
        const viewer = await makeSignIn(data).unwrap();

        if (onSuccess) {
          dispatch(viewerActions.setViewer(viewer));

          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
      }
    },
    [dispatch, makeSignIn, onError, onSuccess]
  );

  return {
    signIn,
    isLoading,
  };
};
