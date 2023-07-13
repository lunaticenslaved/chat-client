import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
import { ROUTES } from "config/routes";
import { useSignUp } from "features/auth/use-sign-up";
import { AuthLayout } from "pages/_layouts/auth-layout";

interface Values {
  email: string;
  name: string;
  password: string;
}

export const SignUpPage = () => {
  const { signUp, isLoading } = useSignUp();
  const [form] = Form.useForm<Values>();

  return (
    <AuthLayout<Values>
      header="Зарегистрироваться"
      description="Для входа в чат нужно зарегистрироваться"
      buttonText="Зарегистрироваться"
      linkText="Уже есть аккаунт? Войти"
      link={ROUTES.auth.signIn}
      onSubmit={signUp}
      isSubmitting={isLoading}
      formInstance={form}
    >
      <Form.Item name="name" rules={[{ required: true, message: "Имя в чате" }]} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: "E-mail" }]} hasFeedback>
        <Input prefix={<UserOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "Пароль" }]} hasFeedback>
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        name="repeatPassword"
        rules={[{ required: true, message: "Повторите пароль" }]}
        hasFeedback
      >
        <Input autoComplete="" prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
    </AuthLayout>
  );
};

export default SignUpPage;
