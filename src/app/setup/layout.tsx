import { redirect } from "next/navigation";
import { checkInitialSetup } from "@/db/queries/users";

export default async function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSetUp = await checkInitialSetup();
  if (isSetUp) redirect("/login");

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      {children}
    </div>
  );
}
