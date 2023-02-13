import { Message, MessageProps } from "shared/components/message";
import dayjs from "shared/lib/dayjs";

const messages: MessageProps[] = [
  {
    isMe: false,
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
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Лови!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    isMe: true,
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
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Лови!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    isMe: true,
    isRead: true,

    attachments: [],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Салам!",
    createdAt: dayjs().subtract(30, "days").toISOString(),
  },
  {
    isMe: false,
    isRead: true,

    attachments: [],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: "Салам, Брут! Чё, как, уничтожил флот галлов?",
    createdAt: dayjs().subtract(2, "days").toISOString(),
  },
  {
    isMe: true,
    isRead: false,

    attachments: [],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: `Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?
      Салам, Брут! Чё, как, уничтожил флот галлов?`,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  {
    isTyping: true,
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    isMe: true,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        type: "image",
      },
    ],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  {
    isMe: true,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://assets.mixkit.co/sfx/preview/mixkit-melodical-flute-music-notification-2310.mp3",
        type: "audio",
      },
    ],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
  {
    isMe: false,
    isRead: false,
    attachments: [
      {
        id: 3,
        filename: "image.jpg",
        url: "https://assets.mixkit.co/sfx/preview/mixkit-melodical-flute-music-notification-2310.mp3",
        type: "audio",
      },
    ],
    userName: "Гай Юлий Цезарь",
    avatarUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    text: ``,
    createdAt: dayjs().subtract(2, "minutes").toISOString(),
  },
];

export interface DialogProps {
  className?: string;
}

export const Dialog = (props: DialogProps) => {
  return (
    <div className={props.className}>
      {messages.map((m, idx) => (
        <Message key={idx} {...m} />
      ))}
    </div>
  );
};
