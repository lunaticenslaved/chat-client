import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
import { useSignUp } from "features/auth/use-sign-up";
import { AuthLayout } from "pages/_layouts/auth-layout";

interface Values {
  email: string;
  name: string;
  password: string;
}

export const SignUpPage = () => {
  const { signUp, isLoading } = useSignUp();

  return (
    <AuthLayout<Values>
      header="Зарегистрироваться"
      description="Для входа в чат нужно зарегистрироваться"
      buttonText="Войти в аккаунт"
      linkText="Зарегистрироваться"
      link="/register"
      onSubmit={signUp}
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

export default SignUpPage;
