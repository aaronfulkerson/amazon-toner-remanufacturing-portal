import { redirect } from "next/navigation";
import { verifyInitialSetup } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth/actions";
import { ROUTES } from "@/modules";

export default async function Home() {
  const setupComplete = await verifyInitialSetup();
  if (!setupComplete) redirect(ROUTES.SETUP);

  const { session } = await getCurrentSession();
  if (!session) redirect(ROUTES.LOGIN);

  redirect(ROUTES.DASHBOARD);
}
