import { useNavigate } from "react-router-dom";

import { LoginForm } from "widgets/auth/login-form";

import { Layout } from "../_lib/layout";

const LoginPage = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/im");
  };

  return (
    <Layout
      header="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
    >
      <LoginForm onSubmit={redirect} />
    </Layout>
  );
};

export default LoginPage;
