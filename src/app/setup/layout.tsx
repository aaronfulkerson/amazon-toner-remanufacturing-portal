import { redirect } from "next/navigation";
import { SessionlessLayoutContainer } from "@/components";
import { ROUTES } from "@/modules";
import { checkInitialUserRoles } from "@/modules/setup";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hasAdmin, hasDelegate } = await checkInitialUserRoles();
  if (hasAdmin && hasDelegate) redirect(ROUTES.ROOT);

  return <SessionlessLayoutContainer>{children}</SessionlessLayoutContainer>;
}
