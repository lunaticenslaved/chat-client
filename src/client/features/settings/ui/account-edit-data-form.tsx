import { CSSProperties, useMemo } from 'react';

import { Button, Flex, Form, Input } from 'antd';

import schema, { Validators } from '@lunaticenslaved/schema';

import { useEditData } from '#/client/features/settings/hooks/edit-data';
import { createAntdValidator } from '#/client/shared/lib/validators';
import { User } from '#/domain/user';

type Values = {
  login: string;
  email: string;
};

type EditAccountDataFormProps = {
  user: User;
  style?: CSSProperties;
  onCancel(): void;
  onSuccess(): void;
};

export function EditAccountDataForm({
  user,
  style,
  onSuccess,
  onCancel,
}: EditAccountDataFormProps) {
  const { isLoading, updateData } = useEditData({
    onSuccess,
  });

  const initialValues = useMemo(
    (): Values => ({
      login: user.login,
      email: user.email,
    }),
    [user.email, user.login],
  );

  return (
    <Form
      style={style}
      layout="vertical"
      initialValues={initialValues}
      disabled={isLoading}
      onFinish={updateData}>
      <Form.Item
        name="login"
        label="Login"
        rules={[{ validator: createAntdValidator(schema.validators.viewer.updateInfo.login) }]}
        hasFeedback>
        <Input placeholder="Login" width="100%" />
      </Form.Item>

      {/* FIXME add real validator */}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[{ validator: createAntdValidator(Validators.required('Email is required')) }]}
        hasFeedback>
        <Input placeholder="Code" width="100%" />
      </Form.Item>

      <Flex>
        <Button
          htmlType="button"
          disabled={isLoading}
          loading={isLoading}
          style={{ marginRight: '10px' }}
          onClick={onCancel}>
          Cancel
        </Button>

        <Button htmlType="submit" type="primary" disabled={isLoading} loading={isLoading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
}
