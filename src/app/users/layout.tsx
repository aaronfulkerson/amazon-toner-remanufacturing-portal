import { redirect } from "next/navigation";
import { requireAuthorizedSession } from "@/lib/auth/session.cached";
import { PERMISSIONS, ROUTES } from "@/modules";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  const isAuthorized = await requireAuthorizedSession(PERMISSIONS.USERS);
  if (!isAuthorized) redirect(ROUTES.DASHBOARD);

  return children;
}
