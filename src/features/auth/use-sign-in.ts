import { useCallback } from "react";

import { useAppDispatch } from "config/store";
import { viewerActions } from "entities/viewer/store";
import { SignInRequest, useSignInMutation } from "entities/viewer/api";
import { ViewerModel } from "entities/viewer/types";

import { Handlers } from "./_lib";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "config/routes";

export const useSignIn = ({ onError, onSuccess }: Handlers<ViewerModel> = {}) => {
  const [makeSignIn, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = useCallback(
    async (data: SignInRequest) => {
      try {
        const viewer = await makeSignIn(data).unwrap();

        dispatch(viewerActions.setViewer(viewer));

        if (viewer.isActivated) {
          navigate(ROUTES.home, {});
        } else {
          navigate(ROUTES.auth.confirmEmailRequired);
        }

        if (onSuccess) {
          onSuccess(viewer);
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
      }
    },
    [dispatch, makeSignIn, navigate, onError, onSuccess]
  );

  return {
    signIn,
    isLoading,
  };
};
