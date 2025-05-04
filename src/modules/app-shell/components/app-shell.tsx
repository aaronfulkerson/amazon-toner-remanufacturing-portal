import { QueryProvider } from "@/components/query-provider";
import { Sidebar } from "@/modules/app-shell";

interface AppShellContentProps {
  children: React.ReactNode;
}

function AppShellContent({ children }: AppShellContentProps) {
  return (
    <main className="min-h-screen py-10 pl-72">
      <div className="px-8 overflow-y-auto">{children}</div>
    </main>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <QueryProvider>
      <div className="min-h-screen">
        <Sidebar />
        <AppShellContent>{children}</AppShellContent>
      </div>
    </QueryProvider>
  );
}
