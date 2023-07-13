import { useGetDialogsQuery } from "entities/dialog/api";
import { DialogModel, dialogsActions, dialogsSelectors } from "entities/dialog/store";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "config/store";

export const useDialogs = () => {
  const { data: dialogs, isFetching: isLoading, isError } = useGetDialogsQuery();
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);
  const dispatch = useAppDispatch();

  const selectDialog = useCallback(
    (dialog: DialogModel) => {
      const foundDialog = (dialogs || []).find(({ id }) => id === dialog.id) || null;

      dispatch(dialogsActions.setCurrentDialog(foundDialog));
    },
    [dialogs, dispatch]
  );

  return {
    currentDialog,
    isLoading,
    isError,
    selectDialog,
    dialogs,
  };
};
