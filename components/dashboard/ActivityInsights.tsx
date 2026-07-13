"use client"

import { Activity } from "lucide-react"
import type { ChartDataPoint, ActivitySummary, AIInsight } from "@/lib/dashboard/types"
import ActivityChart from "./ActivityChart"
import AIInsightsCard from "./AIInsightsCard"

interface ActivityInsightsProps {
  chartData: ChartDataPoint[]
  summary: ActivitySummary
  insight: AIInsight
}

const summaryItems = [
  { key: "prdsCreated" as const, label: "PRDs Created" },
  { key: "roadmapUpdates" as const, label: "Roadmap Updates" },
  { key: "aiWorkflows" as const, label: "AI Workflows" },
  { key: "progressChanges" as const, label: "Progress Changes" },
]

export default function ActivityInsights({ chartData, summary, insight }: ActivityInsightsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-foreground/60" strokeWidth={1.8} />
        <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
          Activity &amp; Insights
        </h2>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div className="rounded-2xl border border-border/30 bg-card/40 p-6 transition-colors duration-200 hover:bg-card/60">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Activity Overview</h3>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
                Weekly activity summary
              </p>
            </div>
          </div>

          <ActivityChart data={chartData} />

          <div className="mt-6 grid grid-cols-4 gap-4 border-t border-border/20 pt-5">
            {summaryItems.map(({ key, label }) => (
              <div key={key}>
                <p className="text-lg font-bold tracking-tight text-foreground">
                  {summary[key]}
                </p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <AIInsightsCard insight={insight} />
      </div>
    </div>
  )
}
