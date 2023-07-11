import { useCallback } from "react";

import { useLogoutMutation } from "api/auth-api";
import { useAppDispatch } from "shared/hooks";

import { Handlers } from "./_lib";
import { viewerActions } from "features/viewer/store";

export const useLogout = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeLogout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    if (!localStorage.getItem("token")) return;

    try {
      await makeLogout().unwrap();

      if (onSuccess) {
        dispatch(viewerActions.setViewer(null));

        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [dispatch, makeLogout, onError, onSuccess]);

  return {
    logout,
    isLoading,
  };
};
