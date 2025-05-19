import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { ROUTES } from "@/modules";
import { SessionlessLayoutContainer } from "@/components";

export default async function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (session) redirect(ROUTES.DASHBOARD);

  return <SessionlessLayoutContainer>{children}</SessionlessLayoutContainer>;
}
