import { Button } from "@/shared/components/Button";
import { useViewer } from "@/entities/viewer";

import { useLogout } from "../hooks";

export function LogoutButton() {
  const { logout } = useLogout();
  const { viewer } = useViewer();

  return viewer ? <Button onClick={logout}>Logout</Button> : null;
}
