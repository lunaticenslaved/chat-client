import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
import { useSignIn } from "features/auth/use-sign-in";
import { AuthLayout } from "pages/_layouts/auth-layout";

interface Values {
  email: string;
  password: string;
}

export const SignInPage = () => {
  const { signIn, isLoading } = useSignIn();

  return (
    <AuthLayout<Values>
      header="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
      buttonText="Войти в аккаунт"
      linkText="Зарегистрироваться"
      link="/register"
      onSubmit={signIn}
      isSubmitting={isLoading}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Укажите e-mail пользователя" }]}
        hasFeedback
      >
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
        hasFeedback
      >
        <Input
          autoComplete=""
          prefix={<LockOutlined />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
    </AuthLayout>
  );
};

export default SignInPage;
