import { DialogsStore } from "@/entities/dialog";
import { useAppSelector } from "@/config/store";

export const useMessages = () => {
  const currentDialog = useAppSelector(DialogsStore.selectors.selectCurrentDialog);

  return { currentDialog, messages: [], isLoading: false, isError: false };
};
