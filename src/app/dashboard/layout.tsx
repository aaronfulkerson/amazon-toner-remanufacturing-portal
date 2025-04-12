import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { ROUTES } from "@/modules";

export default async function DashboardLayout({
  admin,
  employee,
}: Readonly<{
  admin: React.ReactNode;
  employee: React.ReactNode;
}>) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  const component = {
    admin,
    employee,
  };

  return component[user.role];
}
