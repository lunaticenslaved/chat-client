import React, { KeyboardEventHandler, useCallback } from 'react';

import { AudioOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { css } from '@emotion/react';
import { Button, Popover, Typography, Upload, UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

import { useBlockUser } from '#/client/entities/user';
import { Input } from '#/client/shared/components/Input';
import { Flex } from '#/client/shared/components/flex';
import { useNotification } from '#/client/shared/notification';

import { useMessengerContext } from '../../context';
import { getUserFromSelectedItem } from '../../utils';

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
};

const smileButtonCSS = css`
  margin-right: 20px;
`;

export const MessageInput = () => {
  const { showError, showSuccess } = useNotification();
  const [text, setText] = React.useState('');
  const { sendMessage, selectedItem } = useMessengerContext();
  const user = selectedItem ? getUserFromSelectedItem(selectedItem) : undefined;
  const { isUserBlocked, isMeBlockedByUser, unblockUser } = useBlockUser(user?.id || '');

  const onFileUploaded = useCallback(
    (info: UploadChangeParam<UploadFile<unknown>>) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        showSuccess(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        showError(`${info.file.name} file upload failed.`);
      }
    },
    [showError, showSuccess],
  );

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
      <Flex alignItems="center">
        <Button danger onClick={unblockUser} style={{ width: '100%' }}>
          Unblock
        </Button>
      </Flex>
    );
  }

  if (isMeBlockedByUser) {
    return (
      <Flex alignItems="center">
        <Typography.Text>You were blocked by the user</Typography.Text>
      </Flex>
    );
  }

  return (
    <>
      <Popover content={<Picker data={data} locale="ru" onEmojiSelect={onEmojiSelect} />}>
        <Button size="large" shape="circle" css={smileButtonCSS} icon={<SmileOutlined />} />
      </Popover>

      <Input
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        onKeyDown={listenSendMessage}
        placeholder="Введите сообщение..."
        autoFocus
        suffix={
          <Flex alignItems="center" onClick={e => e.stopPropagation()}>
            <Upload {...props} onChange={onFileUploaded} multiple showUploadList={false}>
              <Button size="large" shape="circle" type="text" icon={<CameraOutlined />} />
            </Upload>

            <Button size="large" shape="circle" type="text" icon={<AudioOutlined />} />
          </Flex>
        }
      />
    </>
  );
};
