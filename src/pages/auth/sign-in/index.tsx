import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";
import { ROUTES } from "config/routes";
import { useSignIn } from "features/auth/use-sign-in";
import { AuthLayout } from "pages/_layouts/auth-layout";
import { useNavigate } from "react-router-dom";
import { createAntdValidator, isRequired, validateEmail } from "shared/lib/validators";

interface Values {
  email: string;
  password: string;
}

export const SignInPage = () => {
  const [form] = Form.useForm<Values>();
  const navigate = useNavigate();
  const { signIn, isLoading } = useSignIn({
    onSuccess: () => navigate(ROUTES.home),
  });

  return (
    <AuthLayout<Values>
      header="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
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
    </AuthLayout>
  );
};

export default SignInPage;
