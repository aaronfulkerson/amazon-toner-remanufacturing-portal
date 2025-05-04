import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/actions";
import { ROUTES } from "@/modules";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();
  if (session) redirect(ROUTES.DASHBOARD);

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      {children}
    </div>
  );
}
