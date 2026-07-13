import type { DashboardMetrics } from "@/lib/dashboard/types"

const cards = [
  { key: "totalProjects" as const, label: "Total projects" },
  { key: "inProgress" as const, label: "In progress" },
  { key: "complete" as const, label: "Complete" },
  { key: "roadmapsReady" as const, label: "Roadmaps ready" },
] as const

export default function StatusBoard({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2">
      {cards.map(({ key, label }, i) => (
        <div key={key} className="flex items-center gap-3">
          {i > 0 && (
            <div className="hidden h-8 w-px bg-border/50 sm:block" />
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {metrics[key]}
            </span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
