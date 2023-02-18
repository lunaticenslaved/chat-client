import cn from "classnames";
import { Button } from "antd";
import {
  AudioOutlined,
  CameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { useAppSelector } from "shared/hooks";
import { Divider } from "shared/components/divider";
import { Input } from "shared/components/input";
import { MessageModel } from "features/messages/store/types";
import { viewerSelectors } from "features/viewer";

import { Message } from "./message";
import classes from "./messages-list.module.scss";

// FIXME: заменить определение IsMe для сообщения

export interface MessagesListProps {
  messages: MessageModel[];
}

export const MessagesList = (props: MessagesListProps) => {
  const rootClassName = cn(classes.root);
  const viewer = useAppSelector(viewerSelectors.selectViewer);

  return (
    <div className={rootClassName}>
      <ul className={classes.messagesWrapper}>
        {props.messages.map((m) => (
          <Message key={m.id} message={m} isMe={m.author.id === viewer.id} />
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
