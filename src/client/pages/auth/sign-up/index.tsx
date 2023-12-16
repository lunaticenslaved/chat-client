import { SignUpForm } from '#/client/features/auth';
import { Layout } from '#/client/widgets/layouts';

export const SignUpPage = () => {
  return (
    <Layout.Auth header="Зарегистрироваться" description="Для входа в чат нужно зарегистрироваться">
      <SignUpForm />
    </Layout.Auth>
  );
};

export default SignUpPage;
