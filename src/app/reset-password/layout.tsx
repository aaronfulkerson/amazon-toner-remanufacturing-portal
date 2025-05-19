import { redirect } from "next/navigation";
import { SessionlessLayoutContainer } from "@/components";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { ROUTES } from "@/modules";

export default async function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (session) redirect(ROUTES.DASHBOARD);

  return <SessionlessLayoutContainer>{children}</SessionlessLayoutContainer>;
}
