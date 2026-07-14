"use client"

import type { IntelligenceInsight } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Info,
  Award,
  Sparkles,
} from "lucide-react"

const insightIcons: Record<string, React.ReactNode> = {
  bottleneck: <AlertTriangle className="h-4 w-4" strokeWidth={1.8} />,
  recommendation: <Lightbulb className="h-4 w-4" strokeWidth={1.8} />,
  optimization: <TrendingUp className="h-4 w-4" strokeWidth={1.8} />,
  warning: <Info className="h-4 w-4" strokeWidth={1.8} />,
  achievement: <Award className="h-4 w-4" strokeWidth={1.8} />,
}

const insightColors: Record<string, string> = {
  bottleneck: "text-red-500 bg-red-500/12",
  recommendation: "text-primary bg-primary/12",
  optimization: "text-emerald-500 bg-emerald-500/12",
  warning: "text-amber-500 bg-amber-500/12",
  achievement: "text-amber-500 bg-amber-500/12",
}

const impactBadge: Record<string, string> = {
  high: "bg-red-500/12 text-red-500",
  medium: "bg-amber-500/12 text-amber-500",
  low: "bg-muted-foreground/10 text-muted-foreground/55",
}

interface ProjectIntelligenceCardProps {
  insights: IntelligenceInsight[]
}

export default function ProjectIntelligenceCard({ insights }: ProjectIntelligenceCardProps) {
  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2.5 mb-7">
        <span className="inline-flex rounded-lg bg-primary/12 p-1.5">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
          Project Intelligence
        </span>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.headline}
            className="rounded-lg border border-border/20 bg-card/35 p-4.5 transition-all duration-200 hover:bg-card/55"
          >
            <div className="flex items-start gap-3.5">
              <span
                className={cn(
                  "inline-flex rounded-lg p-2 mt-0.5 shrink-0",
                  insightColors[insight.type],
                )}
              >
                {insightIcons[insight.type]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-foreground">{insight.headline}</p>
                  <span
                    className={cn(
                      "rounded-lg px-2 py-0.5 text-xs font-semibold",
                      impactBadge[insight.impact],
                    )}
                  >
                    {insight.impact}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground/65">
                  {insight.description}
                </p>
                {insight.actionLabel && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-3 h-7 text-xs px-2.5 font-medium"
                  >
                    {insight.actionLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
