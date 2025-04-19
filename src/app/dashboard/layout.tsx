import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { ROUTES } from "@/modules";

export default async function DashboardLayout({
  admin,
  customer,
  employee,
  technician,
}: Readonly<{
  admin: React.ReactNode;
  customer: React.ReactNode;
  employee: React.ReactNode;
  technician: React.ReactNode;
}>) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  const component = {
    admin,
    customer,
    employee,
    technician,
  };

  return component[user.role];
}
