import { useViewer } from '@/entities/viewer';
import { Button } from '@/shared/components/Button';

import { useLogout } from '../hooks';

export function LogoutButton() {
  const { logout, isLoading } = useLogout();
  const { viewer } = useViewer();

  return viewer ? (
    <Button onClick={logout} disabled={isLoading} loading={isLoading}>
      Logout
    </Button>
  ) : null;
}
