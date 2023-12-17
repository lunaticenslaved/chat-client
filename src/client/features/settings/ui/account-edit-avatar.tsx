import { ChangeEventHandler, createRef, useCallback } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

import { UserIcon } from '#/client/entities/user';
import { User } from '#/domain/user';

import { useEditAvatar } from '../hooks/edit-avatar';

export type EditAccountAvatarProps = {
  user: User;
};

export function EditAccountAvatar({ user: viewer }: EditAccountAvatarProps) {
  const inputRef = createRef<HTMLInputElement>();
  const { uploadAvatar, isLoading } = useEditAvatar();

  const openDialog = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const changeAvatar: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const file = event.target.files?.[0];

      if (file && !isLoading) {
        uploadAvatar(file);
      }

      event.target.value = '';
    },
    [isLoading, uploadAvatar],
  );

  return (
    <>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={changeAvatar}
      />

      <div style={{ position: 'relative' }}>
        <Avatar size={240} icon={<UserIcon size={'160px'} />} src={viewer?.avatar?.link} />
        <Button
          icon={<EditOutlined />}
          style={{ position: 'absolute', bottom: '8%', right: '8%' }}
          onClick={openDialog}
          loading={isLoading}
          shape="circle"
          type="primary"
          size="large"
        />
      </div>
    </>
  );
}
