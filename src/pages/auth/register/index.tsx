import { RegisterForm } from "widgets/auth/register-form";

import { Layout } from "../_lib/layout";

const RegisterPage = () => {
  return (
    <Layout
      header="Зарегистрироваться"
      description="Для входа в чат нужно зарегистрироваться"
    >
      <RegisterForm />
    </Layout>
  );
};

export default RegisterPage;
