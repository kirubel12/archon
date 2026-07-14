"use client"

import { Sparkles, Lightbulb, AlertCircle, TrendingUp } from "lucide-react"
import type { DashboardMetrics } from "@/lib/dashboard/types"

interface ProjectIntelligenceCardProps {
  metrics: DashboardMetrics
}

export default function ProjectIntelligenceCard({ metrics }: ProjectIntelligenceCardProps) {
  const needsAttention = metrics.totalProjects - metrics.complete
  const completionRate = metrics.totalProjects > 0
    ? Math.round((metrics.complete / metrics.totalProjects) * 100)
    : 0

  return (
    <div className="rounded-2xl border border-border/25 bg-card/30 p-6 transition-all duration-200 hover:bg-card/50 hover:border-border/40">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex rounded-lg bg-primary/8 p-1.5">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">Project Intelligence</span>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3.5">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-medium text-foreground">Completion rate</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/60">
              {completionRate}% of projects completed. {metrics.inProgress} still in progress.
            </p>
          </div>
        </div>

        {needsAttention > 0 && (
          <div className="flex items-start gap-3.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={1.8} />
            <div>
              <p className="text-sm font-medium text-foreground">
                {needsAttention} project{needsAttention === 1 ? "" : "s"} need{needsAttention === 1 ? "s" : ""} attention
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/60">
                {needsAttention === 1
                  ? "A project without completed PRDs. Continue working to keep progress moving."
                  : `${needsAttention} projects without completed PRDs. Continue working to keep progress moving.`}
              </p>
            </div>
          </div>
        )}

        {metrics.roadmapsReady > 0 && (
          <div className="flex items-start gap-3.5">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" strokeWidth={1.8} />
            <div>
              <p className="text-sm font-medium text-foreground">
                {metrics.roadmapsReady} roadmap{metrics.roadmapsReady === 1 ? "" : "s"} available
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/60">
                {metrics.roadmapsReady === 1
                  ? "A project has a generated roadmap ready for review."
                  : `${metrics.roadmapsReady} projects have generated roadmaps ready for review.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
