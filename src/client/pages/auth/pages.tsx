import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { AuthLayout } from './layout';

const SignIn = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));
const Activate = lazy(() => import('./activate'));

export const authPages = (
  <Route path="auth" element={<AuthLayout />}>
    <Route index element={<Navigate to="/auth/sign-in" />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="sign-in" element={<SignUp />} />
    <Route path="activate" element={<Activate />} />
  </Route>
);
