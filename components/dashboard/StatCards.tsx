"use client"

import type { DashboardMetrics } from "@/lib/dashboard/types"

const sections = [
  { key: "totalProjects" as const, label: "Total Projects" },
  { key: "inProgress" as const, label: "In Progress" },
  { key: "complete" as const, label: "Completed" },
  { key: "roadmapsReady" as const, label: "Roadmaps Ready" },
]

export default function StatCards({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="group/card rounded-[24px] border border-border/70 bg-card p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="grid grid-cols-4">
        {sections.map(({ key, label }, i) => (
          <div key={key} className="relative flex flex-col justify-center px-6 first:pl-0 last:pr-0">
            {i > 0 && (
              <div className="absolute left-0 top-1/2 h-[65%] w-px -translate-y-1/2 bg-border/30" />
            )}
            <p className="text-3xl font-extrabold tracking-tight text-foreground">
              {metrics[key]}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground/70">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
