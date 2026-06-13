import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[linear-gradient(140deg,#e0f2fe_0%,#f8fafc_40%,#dbeafe_100%)] px-4 dark:bg-[linear-gradient(140deg,#082f49_0%,#020617_45%,#0f172a_100%)]">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
