import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthNavigation() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      toSignIn: () => navigate('/auth/sign-in'),
      toSignUp: () => navigate('/auth/sign-up'),
      toActivate: () => navigate('/auth/activate'),
    }),
    [navigate],
  );
}
