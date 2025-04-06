import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { ROUTES } from "@/modules";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  return children;
}
