import { useCallback } from "react";

import { SignUpRequest, useSignUpMutation } from "api/auth-api";

import { Handlers } from "./_lib";
import { useAppDispatch } from "shared/hooks";
import { viewerActions } from "features/viewer/store";

export const useSignUp = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeSignUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const signUp = useCallback(async (data: SignUpRequest) => {
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
  }, []);

  return {
    signUp,
    isLoading,
  };
};
