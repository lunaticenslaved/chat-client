import React from "react";
import { Empty } from "antd";

import { Divider } from "shared/components/divider";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { dialogsSelectors } from "features/dialogs/store";
import { messagesSelectors, messagesActions } from "features/messages/store";

import { Header } from "./header";
import { MessagesList } from "./messages-list";
import { LoadingPlaceholder, NoMessagesPlaceholder } from "./placeholder";
import { MessageInput } from "./input";
import classes from "./chat.module.scss";

export const Chat = () => {
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);
  const messages = useAppSelector(messagesSelectors.selectMessages);
  const isFetching = useAppSelector(messagesSelectors.selectIsFetching);
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

      {isFetching ? (
        <LoadingPlaceholder />
      ) : messages.length === 0 ? (
        <NoMessagesPlaceholder />
      ) : (
        <>
          <MessagesList messages={messages} />
          <Divider />
          <MessageInput />
        </>
      )}
    </div>
  );
};
