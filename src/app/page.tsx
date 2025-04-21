import { redirect } from "next/navigation";
import { verifyInitialSetup } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth/session";
import { Routes } from "@/modules";

export default async function Home() {
  const setupComplete = await verifyInitialSetup();
  if (!setupComplete) redirect(Routes.SETUP);

  const { session } = await getCurrentSession();
  if (!session) redirect(Routes.LOGIN);

  redirect(Routes.DASHBOARD);
}
