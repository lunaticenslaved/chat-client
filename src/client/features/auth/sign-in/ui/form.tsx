import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import Schema from '@lunaticenslaved/schema';

import { ROUTES } from '#/client/config/routes';
import { AuthForm } from '#/client/entities/viewer';
import { createAntdValidator } from '#/client/shared/lib/validators';

import { useSignIn } from '../hooks';

type Values = {
  login: string;
  password: string;
};

const signInValidators = Schema.validators.auth.signIn;

export function SignInForm() {
  const [form] = Form.useForm<Values>();
  const { signIn, isLoading } = useSignIn({});

  return (
    <AuthForm<Values>
      buttonText="Войти в аккаунт"
      linkText="Зарегистрироваться"
      link={ROUTES.auth.signUp}
      onSubmit={signIn}
      isSubmitting={isLoading}
      formInstance={form}>
      <Form.Item
        name="login"
        rules={[{ validator: createAntdValidator(signInValidators.login) }]}
        hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ validator: createAntdValidator(signInValidators.password) }]}
        hasFeedback>
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
    </AuthForm>
  );
}
