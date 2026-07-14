"use client"

import type { ActivityItem } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"
import {
  FileText,
  Rocket,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react"

const activityIcons: Record<string, React.ReactNode> = {
  project_created: <Rocket className="h-3.5 w-3.5" strokeWidth={2} />,
  prd_completed: <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />,
  prd_started: <FileText className="h-3.5 w-3.5" strokeWidth={2} />,
  roadmap_generated: <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />,
}

const activityColors: Record<string, string> = {
  project_created: "text-primary bg-primary/12",
  prd_completed: "text-emerald-500 bg-emerald-500/12",
  prd_started: "text-amber-500 bg-amber-500/12",
  roadmap_generated: "text-primary bg-primary/12",
}

function formatTime(ts: string) {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "Just now"
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface ProjectActivityTimelineProps {
  activity: ActivityItem[]
}

export default function ProjectActivityTimeline({ activity }: ProjectActivityTimelineProps) {
  if (activity.length === 0) {
    return (
      <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-7">
          <span className="inline-flex rounded-lg bg-muted-foreground/10 p-1.5">
            <Clock className="h-4 w-4 text-muted-foreground/55" strokeWidth={1.8} />
          </span>
          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
            Activity
          </span>
        </div>
        <div className="py-10 text-center">
          <p className="text-sm text-muted-foreground/55">No activity recorded yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2.5 mb-7">
        <span className="inline-flex rounded-lg bg-muted-foreground/10 p-1.5">
          <Clock className="h-4 w-4 text-muted-foreground/55" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
          Activity
        </span>
        <span className="text-xs font-medium text-muted-foreground/45 ml-auto">
          {activity.length} events
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-[20px] top-2 bottom-2 w-px bg-border/25" />
        <div className="space-y-0">
          {activity.map((event) => (
            <div key={event.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
              <span
                className={cn(
                  "relative z-10 inline-flex rounded-full p-2 mt-0.5",
                  activityColors[event.type] || "bg-muted-foreground/12 text-muted-foreground/55",
                )}
              >
                {activityIcons[event.type] || <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-foreground">{event.description}</p>
                <p className="mt-1.5 text-xs text-muted-foreground/50">
                  {formatTime(event.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
