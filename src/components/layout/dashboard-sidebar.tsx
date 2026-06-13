"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  FileClock,
  FileUp,
  GanttChartSquare,
  Home,
  KanbanSquare,
  Layers,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { slug: "", label: "Overview", icon: Home },
  { slug: "upload", label: "Upload", icon: FileUp },
  { slug: "analysis", label: "Analysis", icon: ClipboardList },
  { slug: "wbs", label: "WBS", icon: Layers },
  { slug: "sprints", label: "Sprints", icon: KanbanSquare },
  { slug: "timeline", label: "Timeline", icon: GanttChartSquare },
  { slug: "reports", label: "Reports", icon: BarChart3 },
  { slug: "history", label: "History", icon: FileClock },
  { href: "/dashboard/profile", label: "Profile", icon: UserCircle2 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const projectMatch = pathname.match(/\/dashboard\/projects\/([^/]+)/);
  const projectId = projectMatch?.[1];
  const projectBasePath = projectId ? `/dashboard/projects/${projectId}` : null;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white/70 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 lg:block">
      <Link href="/dashboard/projects" className="mb-8 block px-2">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">
          ProjectPilot AI
        </p>
        <h1 className="text-xl font-bold">Control Tower</h1>
      </Link>
      <nav className="space-y-1">
        <Link
          href="/dashboard/projects"
          className={cn(
            "mb-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
            pathname === "/dashboard" || pathname === "/dashboard/projects"
              ? "bg-sky-600 text-white shadow"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
          )}
        >
          <Home className="h-4 w-4" />
          Projects
        </Link>
        {nav.map((item) => {
          const isProjectScoped = item.slug !== undefined;
          const disabled = isProjectScoped && !projectBasePath;
          const href =
            item.href ||
            `${projectBasePath}${item.slug ? `/${item.slug}` : ""}`;
          const active = Boolean(projectBasePath) && pathname === href;
          const Icon = item.icon;
          return (
            <Link
              key={`${item.label}-${href}`}
              href={disabled ? "/dashboard/projects" : href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                disabled && "cursor-not-allowed opacity-50",
              )}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
