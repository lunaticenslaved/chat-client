import { Input, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Schema from "@lunaticenslaved/schema";

import { ROUTES } from "@/config/routes";
import { AuthForm } from "@/entities/viewer";
import { createAntdValidator } from "@/shared/lib/validators";

import { useSignIn } from "../hooks";

type Values = {
  login: string;
  password: string;
};

const signInValidators = Schema.Operation.Auth.SignIn.validators;

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
      formInstance={form}
    >
      <Form.Item
        name="login"
        rules={[{ validator: createAntdValidator(signInValidators.login) }]}
        hasFeedback
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ validator: createAntdValidator(signInValidators.password) }]}
        hasFeedback
      >
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
    </AuthForm>
  );
}
