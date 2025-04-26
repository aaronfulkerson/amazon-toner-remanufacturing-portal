import { redirect } from "next/navigation";
import { UserRole } from "@/db/schema";
import { authorizeCurrentSession } from "@/lib/auth/actions";
import { Routes } from "@/modules";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default async function UsersLayout({ children }: UsersLayoutProps) {
  const hasPermission = await authorizeCurrentSession({
    [UserRole.ADMIN]: true,
    [UserRole.CUSTOMER]: false,
    [UserRole.EMPLOYEE]: false,
    [UserRole.TECHNICIAN]: false,
  });
  if (!hasPermission) redirect(Routes.DASHBOARD);

  return children;
}
