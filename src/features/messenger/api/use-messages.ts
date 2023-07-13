import { dialogsSelectors } from "entities/dialog/store";
import { useAppSelector } from "config/store";
import { useGetMessagesQuery } from "entities/message/api";

export const useMessages = () => {
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);
  const {
    data: messages,
    isError,
    isFetching: isLoading,
  } = useGetMessagesQuery({ dialogId: currentDialog?.id || 0 }, { skip: !currentDialog });

  return { currentDialog, messages, isLoading, isError };
};
