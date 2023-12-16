import { lazy } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

const SignIn = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));
const Activate = lazy(() => import('./activate'));

export { useAuthNavigation } from './navigation';
export { authRoutes } from './routes';

export function useAuthPages() {
  return (
    <Route path="auth" element={<Outlet />}>
      <Route index element={<Navigate to="/auth/sign-in" />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-in" element={<SignUp />} />
      <Route path="activate" element={<Activate />} />
    </Route>
  );
}
