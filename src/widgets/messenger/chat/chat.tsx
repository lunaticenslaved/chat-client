import cn from "classnames";
import { Divider, Button } from "antd";
import {
  AudioOutlined,
  CameraOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Input } from "shared/components/input";
import { Message, MessageProps } from "./message";
import dayjs from "shared/lib/dayjs";

import classes from "./chat.module.scss";

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

export interface ChatProps {
  className?: string;
}

export const Chat = (props: ChatProps) => {
  const rootClassName = cn(props.className, classes.root);
  return (
    <div className={rootClassName}>
      <div className={classes.messagesWrapper}>
        {messages.map((m, idx) => (
          <Message key={idx} {...m} />
        ))}
      </div>

      <Divider className={classes.divider} />

      <div className={classes.inputsWrapper}>
        <Button
          className={classes.smileButton}
          size="large"
          shape="circle"
          icon={<SmileOutlined />}
        />
        <Input
          placeholder="Введите сообщение..."
          suffix={
            <div
              className={classes.inputButtonsWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="large"
                shape="circle"
                type="text"
                icon={<CameraOutlined className={classes.icon} />}
              />
              <Button
                size="large"
                shape="circle"
                type="text"
                icon={<AudioOutlined className={classes.icon} />}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};
