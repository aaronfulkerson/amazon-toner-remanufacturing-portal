import { redirect } from "next/navigation";
import { authorizeCurrentSession } from "@/lib/auth/session.server";
import { PERMISSIONS, ROUTES } from "@/modules";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  const hasPermission = await authorizeCurrentSession(PERMISSIONS.USERS);
  if (!hasPermission) redirect(ROUTES.DASHBOARD);

  return children;
}
