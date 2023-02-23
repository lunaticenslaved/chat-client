import { LoginForm } from "widgets/auth/login-form";

import { Layout } from "../_lib/layout";

const LoginPage = () => {
  return (
    <Layout
      header="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
    >
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
