import { useMemo } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { RuleObject } from 'antd/es/form';

import Schema from '@lunaticenslaved/schema';

import { authRoutes } from '#/client/pages/auth';
import { createAntdValidator } from '#/client/shared/lib/validators';

import { useSignUp } from '../hooks/sign-up';

import { AuthForm } from './auth-form/auth-form';

interface Values {
  login: string;
  email: string;
  password: string;
}

const signUpValidators = Schema.validators.auth.signUp;

export function SignUpForm() {
  const { signUp, isLoading } = useSignUp();
  const [form] = Form.useForm<Values>();

  const validators = useMemo(
    () => ({
      login: [{ validator: createAntdValidator(signUpValidators.login) }],
      email: [{ validator: createAntdValidator(signUpValidators.email) }],
      password: [{ validator: createAntdValidator(signUpValidators.password) }],
      repeatPassword: [
        {
          validator: (_: RuleObject, value: string) => {
            const password = form.getFieldValue('password');

            if (password !== value) {
              return Promise.reject('Пароли не совпадают');
            }

            return Promise.resolve();
          },
        },
      ],
    }),
    [form],
  );
  return (
    <AuthForm<Values>
      buttonText="Зарегистрироваться"
      linkText="Уже есть аккаунт? Войти"
      link={authRoutes.signIn}
      onSubmit={signUp}
      isSubmitting={isLoading}
      formInstance={form}>
      <Form.Item name="login" rules={validators.login} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="Логин" />
      </Form.Item>
      <Form.Item name="email" rules={validators.email} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="password" rules={validators.password} hasFeedback>
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item name="repeatPassword" rules={validators.repeatPassword} hasFeedback>
        <Input prefix={<LockOutlined />} type="password" placeholder="Повторите пароль" />
      </Form.Item>
    </AuthForm>
  );
}
