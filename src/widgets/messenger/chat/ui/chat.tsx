import React from "react";
import { Empty } from "antd";

import { Divider } from "shared/components/divider";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { dialogsSelectors } from "features/dialogs/store";
import { messagesSelectors, messagesActions } from "features/messages/store";

import { Header } from "./header";
import { MessagesList } from "./messages-list";
import classes from "./chat.module.scss";

export const Chat = () => {
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);
  const messages = useAppSelector(messagesSelectors.selectMessages);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      messagesActions.fetchMessagesForDialogId(currentDialog?.id ?? null)
    );
  }, [currentDialog, dispatch]);

  if (!currentDialog) {
    return (
      <div className={classes.emptyRoot}>
        <Empty description="Выберите диалог, чтобы начать общение" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Header
        title={currentDialog.user.name}
        isOnline={currentDialog.user.isOnline}
      />

      <Divider />

      <MessagesList messages={messages} />
    </div>
  );
};
