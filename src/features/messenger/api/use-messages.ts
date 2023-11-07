import { dialogsSelectors } from "@/entities/dialog/store";
import { useAppSelector } from "@/config/store";

export const useMessages = () => {
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);

  return { currentDialog, messages: [], isLoading: false, isError: false };
};
