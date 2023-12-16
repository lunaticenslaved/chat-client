import { AuthCard, SignUpForm } from '#/client/features/auth';

export const SignUpPage = () => {
  return (
    <AuthCard header="Зарегистрироваться" description="Для входа в чат нужно зарегистрироваться">
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
