"use client"

import type { DashboardMetrics } from "@/lib/dashboard/types"

interface ProjectStatsProps {
  metrics: DashboardMetrics
}

export default function ProjectStats({ metrics }: ProjectStatsProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="grid grid-cols-4">
        <div className="relative flex flex-col justify-center px-6 first:pl-0 last:pr-0">
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            {metrics.totalProjects}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground/60 tracking-wide uppercase">
            Total
          </p>
        </div>
        <div className="relative flex flex-col justify-center px-6 first:pl-0 last:pr-0">
          <div className="absolute left-0 top-1/2 h-[60%] w-px -translate-y-1/2 bg-border/20" />
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            {metrics.inProgress}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground/60 tracking-wide uppercase">
            In Progress
          </p>
        </div>
        <div className="relative flex flex-col justify-center px-6 first:pl-0 last:pr-0">
          <div className="absolute left-0 top-1/2 h-[60%] w-px -translate-y-1/2 bg-border/20" />
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            {metrics.complete}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground/60 tracking-wide uppercase">
            Completed
          </p>
        </div>
        <div className="relative flex flex-col justify-center px-6 first:pl-0 last:pr-0">
          <div className="absolute left-0 top-1/2 h-[60%] w-px -translate-y-1/2 bg-border/20" />
          <p className="text-3xl font-extrabold tracking-tight text-foreground">
            {metrics.roadmapsReady}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground/60 tracking-wide uppercase">
            Roadmaps
          </p>
        </div>
      </div>
    </div>
  )
}
