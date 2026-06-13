import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Milestone,
  Rocket,
  Workflow,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#dbeafe_0%,#f8fafc_35%,#cffafe_100%)] dark:bg-[linear-gradient(145deg,#082f49_0%,#020617_42%,#0f172a_100%)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sky-600">
              ProjectPilot AI
            </p>
            <h1 className="text-xl font-bold">AI Delivery Intelligence</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </header>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/70">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              <Rocket className="h-3.5 w-3.5" />
              Built for PMs, BAs, and Engineering Leads
            </p>
            <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
              Convert BRDs and PRDs into execution-ready plans.
            </h2>
            <p className="mb-6 max-w-xl text-slate-600 dark:text-slate-300">
              Upload requirement documents and instantly generate structured
              project intelligence: summary, goals, WBS, sprint planning,
              timeline, and decision-ready reports.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2"
                >
                  Open Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard/projects">Upload First Document</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-sky-600" />
                  Smart Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                Project summary, goals, assumptions, dependencies, and risks
                generated in seconds.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Workflow className="h-4 w-4 text-emerald-600" />
                  WBS & Sprints
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                Expandable WBS tree and sprint cards with story points and task
                estimates.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Milestone className="h-4 w-4 text-amber-500" />
                  Timeline Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                Gantt-style timeline with milestone view for better release
                planning.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-violet-500" />
                  Charts & Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                Visual reports for effort, sprint distribution, risk heat, and
                milestone progress.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/60 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            What you can upload
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {["BRD", "PRD", "SRS", "RFP or Scope Docs"].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium dark:bg-slate-800"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
