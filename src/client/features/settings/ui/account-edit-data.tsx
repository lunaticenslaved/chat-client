import { CSSProperties, useMemo } from 'react';

import { Button, Descriptions, DescriptionsProps } from 'antd';

import { useToggle } from '#/client/shared/hooks';
import { User } from '#/domain/user';

import { EditAccountDataForm } from './account-edit-data-form';

export type EditAccountDataProps = {
  user: User;
  style?: CSSProperties;
};

export function EditAccountData({ user, style }: EditAccountDataProps) {
  const isEditing = useToggle();

  const items: DescriptionsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: 'Login',
        children: user.login,
      },
      {
        key: '2',
        label: 'E-mail',
        children: user.email,
      },
    ],
    [user.email, user.login],
  );

  return isEditing.value ? (
    <EditAccountDataForm
      user={user}
      style={style}
      onSuccess={isEditing.setFalse}
      onCancel={isEditing.setFalse}
    />
  ) : (
    <Descriptions
      style={{ maxWidth: '200px', ...style }}
      title="User info"
      extra={
        <Button type="primary" onClick={isEditing.setTrue}>
          Edit
        </Button>
      }
      layout="vertical"
      items={items}
      column={1}
    />
  );
}
