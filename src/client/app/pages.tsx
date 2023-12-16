import { ClientWrapper } from '#/client/app/client-wrapper';
import { useLogout } from '#/client/features/auth';
import { Pages } from '#/client/pages/pages';

export const PagesWithStore = () => {
  const { logout } = useLogout();

  return (
    <ClientWrapper onRefreshTokenExpired={logout}>
      <Pages />
    </ClientWrapper>
  );
};
