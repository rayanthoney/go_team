import { Sidebar } from "./sidebar";
import { MobileHeader, MobileNav } from "./mobile-nav";
import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <MobileHeader />
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden pt-16 lg:pt-0 lg:pl-64 pb-16 lg:pb-0">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
}
