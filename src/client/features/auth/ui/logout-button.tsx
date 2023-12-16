import { LogoutOutlined } from '@ant-design/icons';

import { useViewer } from '#/client/entities/viewer';
import { Button } from '#/client/shared/components/Button';

import { useLogout } from '../hooks/logout';

export function LogoutButton() {
  const { logout, isLoading } = useLogout();
  const { user: viewer } = useViewer();

  return viewer ? (
    <Button
      onClick={logout}
      disabled={isLoading}
      size="large"
      loading={isLoading}
      type="dashed"
      shape="circle"
      icon={<LogoutOutlined />}
    />
  ) : null;
}
