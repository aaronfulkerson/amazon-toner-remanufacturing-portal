import { redirect } from "next/navigation";
import { requireAuthorizedSession } from "@/lib/auth/session.cached";
import { PERMISSIONS, ROUTES } from "@/modules";

export default async function RemanufacturingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthorized = await requireAuthorizedSession(
    PERMISSIONS.REMANUFACTURING
  );
  if (!isAuthorized) redirect(ROUTES.DASHBOARD);

  return children;
}
