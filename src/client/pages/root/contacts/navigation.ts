import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useContactsNavigation() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      toContacts: () => navigate('/contacts'),
    }),
    [navigate],
  );
}
