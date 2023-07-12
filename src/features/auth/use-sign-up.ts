import { useCallback } from "react";

import { useAppDispatch } from "store";
import { viewerActions } from "entities/viewer/store";
import { SignUpRequest, useSignUpMutation } from "entities/viewer/api";

import { Handlers } from "./_lib";

export const useSignUp = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeSignUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const signUp = useCallback(
    async (data: SignUpRequest) => {
      try {
        const viewer = await makeSignUp(data).unwrap();

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
    [dispatch, makeSignUp, onError, onSuccess]
  );

  return {
    signUp,
    isLoading,
  };
};
