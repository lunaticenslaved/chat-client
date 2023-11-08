import { useCallback } from "react";

import { useAppDispatch } from "@/config/store";
import { ViewerStore } from "@/entities/viewer";
import { SignUpRequest, useSignUpMutation } from "@/entities/viewer/api";

import { Handlers } from "./_lib";

export const useSignUp = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeSignUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const signUp = useCallback(
    async (data: SignUpRequest) => {
      try {
        const viewer = await makeSignUp(data).unwrap();

        if (onSuccess) {
          dispatch(ViewerStore.actions.setViewer(viewer));

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
