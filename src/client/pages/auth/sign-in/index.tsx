import { SignInForm } from '#/client/features/auth';
import { Layout } from '#/client/widgets/layouts';

export const SignInPage = () => {
  return (
    <Layout.Auth header="Войти в аккаунт" description="Пожалуйста, войдите в свой аккаунт">
      <SignInForm />
    </Layout.Auth>
  );
};

export default SignInPage;
