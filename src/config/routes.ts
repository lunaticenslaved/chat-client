export const ROUTES = Object.freeze({
  home: "/",
  error404: "*",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    confirmEmailRequired: "/confirm-email-required",
    confirmEmailActivate: "/activate/:link",
  },
});
