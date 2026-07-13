"use client"

import { Sparkles } from "lucide-react"
import type { AIInsight } from "@/lib/dashboard/types"

export default function AIInsightsCard({ insight }: { insight: AIInsight }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/30 bg-card/40 p-6 transition-colors duration-200 hover:bg-card/60">
      <div className="flex items-center gap-2">
        <span className="inline-flex rounded-lg bg-primary/10 p-1.5">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground">AI Insight</span>
      </div>

      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-foreground">
        {insight.headline}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {insight.description}
      </p>

      <div className="mt-auto pt-5">
        <p className="text-xs font-semibold text-foreground/80">Recommended actions</p>
        <ul className="mt-3 space-y-2">
          {insight.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <span className="text-muted-foreground/90">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
