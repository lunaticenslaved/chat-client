import { useViewer } from '@/entities/viewer';
import { Button } from '@/shared/components/Button';

import { useLogout } from '../hooks';

export function LogoutButton() {
  const { logout } = useLogout();
  const { viewer } = useViewer();

  return viewer ? <Button onClick={logout}>Logout</Button> : null;
}
