import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSettingsNavigation() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      toSettings: () => navigate('/settings'),
    }),
    [navigate],
  );
}
