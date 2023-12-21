import React, { KeyboardEventHandler, useCallback } from 'react';

import { AudioOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button, Flex, Popover, Typography, Upload, UploadProps, message } from 'antd';

import { useBlockUser } from '#/client/entities/user';
import { useMessengerContext } from '#/client/features/messenger/context';
import { Input } from '#/client/shared/components/Input';

import { getUserFromSelectedItem } from '../../utils';

import classes from './message-input.module.scss';

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const MessageInput = () => {
  const [text, setText] = React.useState('');
  const { sendMessage, selectedItem } = useMessengerContext();
  const user = selectedItem ? getUserFromSelectedItem(selectedItem) : undefined;
  const { isUserBlocked, isMeBlockedByUser, unblockUser } = useBlockUser(user?.id || '');

  const onEmojiSelect = useCallback(
    (emoji: { native: unknown }) => {
      if (!emoji) return;

      setText(text + emoji.native);
    },
    [text],
  );

  const listenSendMessage: KeyboardEventHandler = useCallback(
    event => {
      if (event.key !== 'Enter') return;

      if (sendMessage(text)) {
        setText('');
      }
    },
    [sendMessage, text],
  );

  if (isUserBlocked) {
    return (
      <Flex align="center" className={classes.root}>
        <Button danger onClick={unblockUser} style={{ width: '100%' }}>
          Unblock
        </Button>
      </Flex>
    );
  }

  if (isMeBlockedByUser) {
    return (
      <Flex align="center" className={classes.root}>
        <Typography.Text>You were blocked by the user</Typography.Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" className={classes.root}>
      <Popover content={<Picker data={data} locale="ru" onEmojiSelect={onEmojiSelect} />}>
        <Button
          className={classes.smileButton}
          size="large"
          shape="circle"
          icon={<SmileOutlined />}
        />
      </Popover>

      <Input
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        onKeyDown={listenSendMessage}
        placeholder="Введите сообщение..."
        autoFocus
        suffix={
          <div className={classes.buttonsWrapper} onClick={e => e.stopPropagation()}>
            <Upload {...props} multiple showUploadList={false}>
              <Button
                size="large"
                shape="circle"
                type="text"
                icon={<CameraOutlined className={classes.icon} />}
              />
            </Upload>

            <Button
              size="large"
              shape="circle"
              type="text"
              icon={<AudioOutlined className={classes.icon} />}
            />
          </div>
        }
      />
    </Flex>
  );
};
