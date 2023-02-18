import { Empty } from "antd";

import dayjs from "shared/lib/dayjs";
import { Divider } from "shared/components/divider";
import { useAppSelector } from "shared/hooks";
import { dialogsSelectors } from "features/dialogs/store";

import { MessageModel } from "../types";
import { Header } from "./header";
import { MessagesList } from "./messages-list";

import classes from "./chat.module.scss";

const messages: MessageModel[] = [
  {
    id: 1,
    isRead: true,
    attachments: [
      {
        id: 1,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
      {
        id: 2,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
      {
        id: 3,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
    ],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: "Лови!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    id: 2,
    isRead: true,
    attachments: [
      {
        id: 1,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
      {
        id: 2,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
      {
        id: 3,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
    ],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: "Лови!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    id: 3,
    isRead: true,
    attachments: [],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: "Салам!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    id: 4,
    isRead: true,
    attachments: [],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: "Салам, Брут! Чё, как, уничтожил флот галлов?",
    createdAt: dayjs().subtract(2, "days").toISOString(),
  },
  {
    id: 5,
    isRead: false,
    attachments: [],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: `Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?`,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  // {
  //   isTyping: true,
  //   userName: "Гай Юлий Цезарь",
  //   avatarUrl:
  //     "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  // },

  // image
  {
    id: 6,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
    ],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  {
    id: 1222,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
    ],
    sender: {
      id: 2,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },

  // audio
  {
    id: 8,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://assets.mixkit.co/sfx/preview/mixkit-melodical-flute-music-notification-2310.mp3",
        type: "audio",
      },
    ],
    sender: {
      id: 2,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  {
    id: 9,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://assets.mixkit.co/sfx/preview/mixkit-melodical-flute-music-notification-2310.mp3",
        type: "audio",
      },
    ],
    sender: {
      id: 1,
      name: "Гай Юлий Цезарь",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    },
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
];

export const Chat = () => {
  const currentDialog = useAppSelector(dialogsSelectors.selectCurrentDialog);

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
