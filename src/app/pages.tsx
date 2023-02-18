import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoginPage = React.lazy(() => import("pages/auth/login"));
const RegisterPage = React.lazy(() => import("pages/auth/register"));
const ConfirmEmailPage = React.lazy(() => import("pages/auth/confirm-email"));
const HomePage = React.lazy(() => import("pages/home"));
const PageNotFound = React.lazy(() => import("pages/not-found"));

export const Pages = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/im" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
