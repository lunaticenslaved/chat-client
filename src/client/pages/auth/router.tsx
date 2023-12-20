import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { AuthLayout } from './layout';

const SignIn = withLoadPage(lazy(() => import('./sign-in')));
const SignUp = withLoadPage(lazy(() => import('./sign-up')));
const Activate = withLoadPage(lazy(() => import('./activate')));

export const authRouter = (
  <Route path="auth" element={<AuthLayout />}>
    <Route index element={<Navigate to="/auth/sign-in" />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="sign-in" element={<SignUp />} />
    <Route path="activate" element={<Activate />} />
  </Route>
);
