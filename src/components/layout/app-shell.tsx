import Link from "next/link";
import { Menu } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

const mobileNav = [
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,#f8fafc_42%,#f1f5f9)] dark:bg-[radial-gradient(circle_at_top_left,#082f49,#020617_45%,#0f172a)]">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="font-semibold">ProjectPilot AI</span>
            </div>
            <nav className="hidden items-center gap-2 lg:flex">
              {mobileNav.map((item) => (
                <Button asChild key={item.href} variant="ghost" size="sm">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <LogoutButton />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
