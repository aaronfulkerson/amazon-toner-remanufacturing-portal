import { redirect } from "next/navigation";
import { verifyInitialSetup } from "@/db/queries";
import { Routes } from "@/modules";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setupComplete = await verifyInitialSetup();
  if (setupComplete) redirect(Routes.ROOT);

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      {children}
    </div>
  );
}
