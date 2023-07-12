import { useCallback } from "react";

import { useAppDispatch } from "store";
import { viewerActions } from "entities/viewer/store";
import { SignInRequest, useSignInMutation } from "entities/viewer/api";

import { Handlers } from "./_lib";

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
