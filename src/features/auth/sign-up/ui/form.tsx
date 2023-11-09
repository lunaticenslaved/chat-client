import { useMemo } from "react";
import { Form, Input } from "antd";
import { RuleObject } from "antd/es/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { ROUTES } from "@/config/routes";
import { AuthForm } from "@/entities/viewer";
import {
  createAntdValidator,
  validateEmail,
  validateLogin,
  validateNewPassword,
} from "@/shared/lib/validators";

import { useSignUp } from "../hooks";

interface Values {
  email: string;
  name: string;
  password: string;
}

export function SignUpForm() {
  const { signUp, isLoading } = useSignUp({});
  const [form] = Form.useForm<Values>();

  const validators = useMemo(
    () => ({
      name: [{ validator: createAntdValidator(validateLogin) }],
      email: [{ validator: createAntdValidator(validateEmail) }],
      password: [{ validator: createAntdValidator(validateNewPassword) }],
      repeatPassword: [
        {
          validator: (_: RuleObject, value: string) => {
            const password = form.getFieldValue("password");

            if (password !== value) {
              return Promise.reject("Пароли не совпадают");
            }

            return Promise.resolve();
          },
        },
      ],
    }),
    [form]
  );
  return (
    <AuthForm<Values>
      buttonText="Зарегистрироваться"
      linkText="Уже есть аккаунт? Войти"
      link={ROUTES.auth.signIn}
      onSubmit={signUp}
      isSubmitting={isLoading}
      formInstance={form}
    >
      <Form.Item name="name" rules={validators.name} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="email" rules={validators.email} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="password" rules={validators.password} hasFeedback>
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item name="repeatPassword" rules={validators.repeatPassword} hasFeedback>
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
    </AuthForm>
  );
}
