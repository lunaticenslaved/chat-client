import { LogoutOutlined } from '@ant-design/icons';

import { useViewer } from '#/client/entities/viewer';
import { Button } from '#/client/shared/components/Button';

import { useLogout } from '../hooks';

export function LogoutButton() {
  const { logout, isLoading } = useLogout();
  const { user: viewer } = useViewer();

  return viewer ? (
    <Button
      onClick={logout}
      disabled={isLoading}
      type="text"
      size="large"
      shape="circle"
      loading={isLoading}
      icon={<LogoutOutlined />}
    />
  ) : null;
}
