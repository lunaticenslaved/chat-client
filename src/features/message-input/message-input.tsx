import React, { useCallback } from 'react';

import { AudioOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button, Popover, Upload, UploadProps, message } from 'antd';

import classes from './message-input.module.scss';
import { useMessage } from '@/entities/message';
import { Input } from '@/shared/components/Input';

// FIXME: устанавливать у

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
  const { createMessage } = useMessage();

  const onEmojiSelect = useCallback(
    (emoji: { native: unknown }) => {
      if (!emoji) return;
      setText(text + emoji.native);
    },
    [text],
  );

  const sendMessage = useCallback(() => {
    createMessage({ text });
  }, [createMessage, text]);

  return (
    <div className={classes.root}>
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
        onKeyDown={sendMessage}
        placeholder="Введите сообщение..."
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
    </div>
  );
};
