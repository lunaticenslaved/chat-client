import { Input, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { ROUTES } from "@/config/routes";
import { AuthForm } from "@/entities/viewer";
import { createAntdValidator, isRequired, validateEmail } from "@/shared/lib/validators";

import { useSignIn } from "../hooks";

type Values = {
  email: string;
  password: string;
};

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
        name="email"
        rules={[{ validator: createAntdValidator(validateEmail) }]}
        hasFeedback
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ validator: createAntdValidator(isRequired) }]}
        hasFeedback
      >
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
    </AuthForm>
  );
}
