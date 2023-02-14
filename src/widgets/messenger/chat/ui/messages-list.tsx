import cn from "classnames";
import { Button } from "antd";
import {
  AudioOutlined,
  CameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Divider } from "shared/components/divider";
import { Input } from "shared/components/input";
import { Message } from "./message";

import { MessageModel } from "../types";
import classes from "./messages-list.module.scss";

// FIXME: заменить определение IsMe для сообщения

export interface MessagesListProps {
  messages: MessageModel[];
}

export const MessagesList = (props: MessagesListProps) => {
  const rootClassName = cn(classes.root);

  return (
    <div className={rootClassName}>
      <ul className={classes.messagesWrapper}>
        {props.messages.map((m) => (
          <Message key={m.id} message={m} isMe={m.sender.id === 1} />
        ))}
      </ul>

      <Divider />

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
