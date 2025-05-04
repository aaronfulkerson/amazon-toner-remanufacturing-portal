import { redirect } from "next/navigation";
import { ROUTES } from "@/modules";
import { verifyInitialSetup } from "@/modules/setup";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setupComplete = await verifyInitialSetup();
  if (setupComplete) redirect(ROUTES.ROOT);

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      {children}
    </div>
  );
}
