import { AuthCard, SignInForm } from '#/client/features/auth';

export const SignInPage = () => {
  return (
    <AuthCard header="Войти в аккаунт" description="Пожалуйста, войдите в свой аккаунт">
      <SignInForm />
    </AuthCard>
  );
};

export default SignInPage;
