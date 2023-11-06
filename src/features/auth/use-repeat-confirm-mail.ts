import { useCallback } from "react";

import { useRepeatConfirmMailMutation } from "@/entities/viewer/api";

import { Handlers } from "./_lib";

export const useRepeatConfirmMail = ({ onError, onSuccess }: Handlers = {}) => {
  const [makeRepeat, { isLoading }] = useRepeatConfirmMailMutation();

  const repeat = useCallback(async () => {
    try {
      await makeRepeat().unwrap();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [makeRepeat, onError, onSuccess]);

  return {
    repeat,
    isLoading,
  };
};
