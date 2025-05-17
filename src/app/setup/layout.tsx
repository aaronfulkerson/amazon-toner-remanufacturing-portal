import { redirect } from "next/navigation";
import { ROUTES } from "@/modules";
import { verifyInitialSetup } from "@/modules/setup";
import { SessionlessLayoutContainer } from "@/components";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setupComplete = await verifyInitialSetup();
  if (setupComplete) redirect(ROUTES.ROOT);

  return <SessionlessLayoutContainer>{children}</SessionlessLayoutContainer>;
}
