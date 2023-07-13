import { useCallback } from "react";

import { useAppDispatch } from "config/store";
import { useLogoutMutation } from "entities/viewer/api";
import { viewerActions } from "entities/viewer/store";

import { Handlers } from "./_lib";

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
