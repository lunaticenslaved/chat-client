import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSettingsNavigation() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      toSettings: () => navigate('/settings'),
      toAccountSettings: () => navigate('/settings/account'),
      toAppearanceSettings: () => navigate('/settings/appearance'),
      toSessionsSettings: () => navigate('/settings/sessions'),
    }),
    [navigate],
  );
}
