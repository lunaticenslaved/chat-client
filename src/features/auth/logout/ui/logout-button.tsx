import { useLogout } from '../hooks';

import { useViewer } from '@/entities/viewer';
import { Button } from '@/shared/components/Button';

export function LogoutButton() {
  const { logout } = useLogout();
  const { viewer } = useViewer();

  return viewer ? <Button onClick={logout}>Logout</Button> : null;
}
