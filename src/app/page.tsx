import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { ROUTES } from "@/modules";
import { checkInitialUserRoles } from "@/modules/setup";

export default async function Home() {
  const { hasAdmin, hasDelegate } = await checkInitialUserRoles();
  if (!hasAdmin || !hasDelegate) redirect(ROUTES.SETUP);

  const { session } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  redirect(ROUTES.DASHBOARD);
}
