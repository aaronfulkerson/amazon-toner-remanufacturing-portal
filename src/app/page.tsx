import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { ROUTES } from "@/modules";
import { verifyInitialSetup } from "@/modules/setup";

export default async function Home() {
  const setupComplete = await verifyInitialSetup();
  if (!setupComplete) redirect(ROUTES.SETUP);

  const { session } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  redirect(ROUTES.DASHBOARD);
}
