import { redirect } from "next/navigation";
import { checkInitialSetup } from "@/db/queries/users";
import { getCurrentSession } from "@/lib/auth/session";

export default async function Home() {
  const isSetUp = await checkInitialSetup();
  if (!isSetUp) redirect("/setup");

  const { session } = await getCurrentSession();
  if (!session) redirect("/login");

  redirect("/dashboard");
}
