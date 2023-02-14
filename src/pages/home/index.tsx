import React from "react";

import dayjs from "shared/lib/dayjs";
import { Divider } from "shared/components/divider";
import { Chat } from "widgets/messenger/chat";
import { ChatHeader } from "widgets/messenger/chat-header";
import { Sidebar, DialogModel } from "widgets/messenger/sidebar";

import classes from "./home-page.module.scss";

const dialogs: DialogModel[] = [
  {
    id: 1,
    user: {
      id: 1,
      isOnline: true,
      name: "Маяковский Вова",
    },
    lastMessage: {
      isRead: false,
      senderId: 1,
      text: "И вот, значит, достаю я из широких штанин",
      time: dayjs().subtract(1, "minutes").toISOString(),
    },
    notReadMessages: 1,
  },
  {
    id: 2,
    user: {
      id: 1,
      isOnline: false,
      name: "Федор Михайлович Достоевский",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg",
    },
    lastMessage: {
      isRead: false,
      senderId: 1,
      text: "Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька",
      time: dayjs().subtract(1, "day").toISOString(),
    },
    notReadMessages: 121222,
  },
];

const HomePage = () => {
  const [selectedDialog, setSelectedDialog] = React.useState<DialogModel>();

  return (
    <div className={classes.root}>
      <Sidebar
        dialogs={dialogs}
        selectedDialog={selectedDialog}
        onDialogSelected={setSelectedDialog}
      />

      <Divider vertical />

      <Chat selectedDialog={selectedDialog} />
    </div>
  );
};

export default HomePage;
