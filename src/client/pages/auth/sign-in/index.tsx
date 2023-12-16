import { SignInForm } from '#/client/features/auth';
import { AuthLayout } from '#/client/widgets/layouts';

export const SignInPage = () => {
  return (
    <AuthLayout header="Войти в аккаунт" description="Пожалуйста, войдите в свой аккаунт">
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
