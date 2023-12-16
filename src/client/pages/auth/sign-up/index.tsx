import { SignUpForm } from '#/client/features/auth';
import { AuthLayout } from '#/client/widgets/layouts';

export const SignUpPage = () => {
  return (
    <AuthLayout header="Зарегистрироваться" description="Для входа в чат нужно зарегистрироваться">
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
