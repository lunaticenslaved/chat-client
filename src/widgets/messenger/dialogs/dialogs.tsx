import { useDialogs } from "features/messenger/api/use-dialogs";
import { DialogsList } from "features/messenger/components/dialogs-list";

export const Dialogs = () => {
  const { isError, isLoading, dialogs, currentDialog, selectDialog } = useDialogs();

  return (
    <DialogsList
      dialogs={dialogs || []}
      isError={isError}
      isLoading={isLoading}
      currentDialogId={currentDialog?.id}
      onSelectDialog={selectDialog}
    />
  );
};
