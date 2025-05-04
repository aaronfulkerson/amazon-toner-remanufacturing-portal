import { redirect } from "next/navigation";
import { USER_ROLE } from "@/db/schema";
import { authorizeCurrentSession } from "@/lib/auth/actions";
import { ROUTES } from "@/modules";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  const hasPermission = await authorizeCurrentSession({
    [USER_ROLE.ADMIN]: true,
    [USER_ROLE.CUSTOMER]: false,
    [USER_ROLE.EMPLOYEE]: false,
    [USER_ROLE.TECHNICIAN]: false,
  });
  if (!hasPermission) redirect(ROUTES.DASHBOARD);

  return children;
}
