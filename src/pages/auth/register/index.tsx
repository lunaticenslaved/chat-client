import { useNavigate } from "react-router-dom";

import { RegisterForm } from "widgets/auth/register-form";

import { Layout } from "../_lib/layout";

const RegisterPage = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/confirm-email", { replace: true });
  };

  return (
    <Layout
      header="Зарегистрироваться"
      description="Для входа в чат нужно зарегистрироваться"
    >
      <RegisterForm onSuccess={redirect} />
    </Layout>
  );
};

export default RegisterPage;
