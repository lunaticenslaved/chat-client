import { SignUpForm } from '@/features/auth/sign-up';
import { Layout } from '@/widgets/layouts';

export const SignUpPage = () => {
  return (
    <Layout.Auth header="Зарегистрироваться" description="Для входа в чат нужно зарегистрироваться">
      <SignUpForm />
    </Layout.Auth>
  );
};

export default SignUpPage;
