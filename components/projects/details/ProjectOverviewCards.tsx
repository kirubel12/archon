"use client"

import type { Project, ProjectDetailData } from "@/lib/dashboard/types"
import { getProjectMetrics } from "@/lib/dashboard/types"
import { cn, pluralize } from "@/lib/utils"
import {
  ClipboardList,
  FileText,
  Brain,
  Zap,
} from "lucide-react"

interface ProjectOverviewCardsProps {
  project: Project
  detail: ProjectDetailData
}

interface KpiCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sublabel?: string
  accent?: boolean
  compact?: boolean
}

function KpiCard({ icon, label, value, sublabel, accent, compact }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        accent && "border-primary/20 bg-gradient-to-br from-primary/8 to-card/40",
      )}
    >
      <div className="flex items-start gap-3.5">
        <span className={cn(
          "inline-flex rounded-lg p-2 mt-0.5",
          accent ? "bg-primary/12 text-primary" : "bg-muted-foreground/10 text-muted-foreground/60",
        )}>
          {icon}
        </span>
        <div className="min-w-0">
          {compact ? (
            <p className="text-sm font-semibold leading-tight text-foreground">
              {value}
            </p>
          ) : (
            <p className="text-2xl font-semibold leading-none tracking-tight text-foreground tabular-nums">
              {value}
            </p>
          )}
          <p className="mt-2 text-xs font-medium leading-tight text-muted-foreground/65">{label}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground/45 mt-1 leading-tight">{sublabel}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectOverviewCards({ project, detail }: ProjectOverviewCardsProps) {
  const { completed, total, isComplete } = getProjectMetrics(project)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  const completedDocs = detail.assets.filter((a) => a.status === "completed").length
  const activeInsights = detail.insights.filter((i) => i.impact === "high" || i.impact === "medium").length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiCard
        icon={<ClipboardList className="h-4 w-4" strokeWidth={1.8} />}
        label="Progress"
        value={`${percentage}%`}
        sublabel={pluralize(completed, "phase", "phases") + " complete"}
        accent
      />
      <KpiCard
        icon={<FileText className="h-4 w-4" strokeWidth={1.8} />}
        label="Documents"
        value={detail.assets.length}
        sublabel={pluralize(completedDocs, "completed")}
      />
      <KpiCard
        icon={<Brain className="h-4 w-4" strokeWidth={1.8} />}
        label="AI Confidence"
        value={`${detail.health.readinessScore}%`}
        sublabel={pluralize(activeInsights, "insight") + " available"}
      />
      <KpiCard
        icon={<Zap className="h-4 w-4" strokeWidth={1.8} />}
        label="Health"
        value={detail.health.trend === "improving" ? "Improving" : detail.health.trend === "stable" ? "Stable" : "Needs Attention"}
        sublabel={pluralize(detail.health.blockers.length, "blocker")}
        compact
      />
    </div>
  )
}
