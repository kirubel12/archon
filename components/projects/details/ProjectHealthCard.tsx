"use client"

import type { ProjectHealthMetrics, IntelligenceInsight } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"
import { Activity, AlertTriangle, TrendingDown, TrendingUp, Minus, Shield, FileWarning } from "lucide-react"

const trendIcons: Record<string, React.ReactNode> = {
  improving: <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />,
  stable: <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />,
  declining: <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} />,
}

const trendColors: Record<string, string> = {
  improving: "text-emerald-500 bg-emerald-500/12",
  stable: "text-muted-foreground/55 bg-muted-foreground/12",
  declining: "text-red-500 bg-red-500/12",
}

const riskColors: Record<string, string> = {
  low: "text-emerald-500 bg-emerald-500/12",
  medium: "text-amber-500 bg-amber-500/12",
  high: "text-red-500 bg-red-500/12",
}

interface ProjectHealthCardProps {
  health: ProjectHealthMetrics
  insights: IntelligenceInsight[]
}

export default function ProjectHealthCard({ health, insights }: ProjectHealthCardProps) {
  const highImpact = insights.filter((i) => i.impact === "high").length

  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2.5 mb-7">
        <span className="inline-flex rounded-lg bg-muted-foreground/10 p-1.5">
          <Activity className="h-4 w-4 text-muted-foreground/55" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
          Health
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="rounded-lg border border-border/20 bg-card/35 p-4">
          <p className="text-[10px] font-semibold text-muted-foreground/55 uppercase tracking-wide mb-3">Trend</p>
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex rounded-full p-1.5", trendColors[health.trend])}>
              {trendIcons[health.trend]}
            </span>
            <span className="text-sm font-semibold text-foreground capitalize">{health.trend}</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/20 bg-card/35 p-4">
          <p className="text-[10px] font-semibold text-muted-foreground/55 uppercase tracking-wide mb-3">Risk</p>
          <div className="flex items-center gap-2">
            <span className={cn("inline-flex rounded-full p-1.5", riskColors[health.riskLevel])}>
              <Shield className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold text-foreground capitalize">{health.riskLevel}</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/20 bg-card/35 p-4">
          <p className="text-[10px] font-semibold text-muted-foreground/55 uppercase tracking-wide mb-3">Readiness</p>
          <div className="flex items-center gap-2">
            <div className="relative h-2 w-full max-w-[60px] overflow-hidden rounded-full bg-muted/25">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-1000"
                style={{ width: `${health.readinessScore}%` }}
              />
            </div>
            <span className="text-sm font-semibold tabular-nums text-foreground">{health.readinessScore}%</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/20 bg-card/35 p-4">
          <p className="text-[10px] font-semibold text-muted-foreground/55 uppercase tracking-wide mb-3">Alerts</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full p-1.5 bg-amber-500/12 text-amber-500">
              <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {health.blockers.length + highImpact}
            </span>
          </div>
        </div>
      </div>

      {health.blockers.length > 0 && (
        <div className="mt-5 space-y-2">
          {health.blockers.map((blocker, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg bg-red-500/7 px-3.5 py-3">
              <FileWarning className="h-4 w-4 text-red-500 shrink-0" strokeWidth={1.8} />
              <span className="text-sm text-muted-foreground/70">{blocker}</span>
            </div>
          ))}
        </div>
      )}

      {health.staleDocuments > 0 && (
        <div className="mt-5 flex items-center gap-2.5 rounded-lg bg-amber-500/7 px-3.5 py-3">
          <FileWarning className="h-4 w-4 text-amber-500 shrink-0" strokeWidth={1.8} />
          <span className="text-sm text-muted-foreground/70">
            {health.staleDocuments} stale document{health.staleDocuments === 1 ? "" : "s"} — review recommended
          </span>
        </div>
      )}
    </div>
  )
}
