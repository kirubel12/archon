"use client"

import type { ProjectDetailData } from "@/lib/dashboard/types"
import { cn, pluralize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Layers,
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  FileText,
} from "lucide-react"

interface ProjectWorkflowCardProps {
  detail: ProjectDetailData
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    badge: "bg-emerald-500/10 text-emerald-500",
    rail: "border-emerald-500/70 bg-emerald-500/10 text-emerald-500",
    dependency: "bg-emerald-500/10 text-emerald-500",
    label: "Completed",
  },
  in_progress: {
    icon: Play,
    badge: "bg-primary/10 text-primary",
    rail: "border-primary/70 bg-primary/10 text-primary",
    dependency: "bg-primary/10 text-primary",
    label: "In Progress",
  },
  not_started: {
    icon: Clock,
    badge: "bg-muted-foreground/10 text-muted-foreground/55",
    rail: "border-border/70 bg-muted/30 text-muted-foreground/55",
    dependency: "bg-muted-foreground/10 text-muted-foreground/55",
    label: "Not Started",
  },
  blocked: {
    icon: Clock,
    badge: "bg-red-500/10 text-red-500",
    rail: "border-red-500/70 bg-red-500/10 text-red-500",
    dependency: "bg-red-500/10 text-red-500",
    label: "Blocked",
  },
}

function getPhaseDescription(phase: ProjectDetailData["phases"][number]) {
  if (phase.status === "completed") return "All deliverables completed successfully."
  if (phase.status === "in_progress") return `Currently working through ${phase.progress}% of this phase.`
  if (phase.status === "blocked") return "Blocked by dependencies that have not been completed yet."
  return "Ready to begin once the previous phase is complete."
}

export default function ProjectWorkflowCard({ detail }: ProjectWorkflowCardProps) {
  const completedCount = detail.phases.filter((phase) => phase.status === "completed").length

  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-flex rounded-lg bg-muted-foreground/10 p-2">
          <Layers className="h-5 w-5 text-muted-foreground/60" strokeWidth={1.8} />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Workflow</h3>
          <p className="text-xs text-muted-foreground/60">
            {completedCount} of {detail.phases.length} phases complete
          </p>
        </div>
      </div>

      <div className="space-y-7">
        {detail.phases.map((phase, i) => {
          const cfg = statusConfig[phase.status]
          const isLast = i === detail.phases.length - 1
          const StatusIcon = cfg.icon

          return (
            <div
              key={phase.type}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4"
            >
              <div className="relative flex min-h-full justify-center">
                {!isLast && <div className="absolute top-12 bottom-[-1.75rem] w-px bg-border/30" />}
                <div
                  className={cn(
                    "relative z-10 mt-1 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                    cfg.rail,
                  )}
                >
                  <StatusIcon className="h-[18px] w-[18px]" strokeWidth={2.4} />
                </div>
              </div>

              <div
                className={cn(
                  "min-w-0 space-y-3 pb-7",
                  isLast ? "pb-0" : "border-b border-border/15",
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-base font-semibold leading-none text-foreground">
                        {phase.label}
                      </h4>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                          cfg.badge,
                        )}
                      >
                        <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                        {cfg.label}
                      </span>
                    </div>

                    <p className="max-w-[60ch] text-sm leading-6 text-muted-foreground/70">
                      {getPhaseDescription(phase)}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {phase.status === "in_progress" && (
                      <Button size="sm" className="h-9 px-4 text-xs font-medium">
                        Continue
                        <ChevronRight className="ml-1 h-3.5 w-3.5" strokeWidth={2} />
                      </Button>
                    )}
                    {phase.status === "not_started" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 border-primary/30 px-4 text-xs font-medium text-primary/85 hover:border-primary/45 hover:bg-primary/10 hover:text-primary"
                      >
                        Start
                        <ChevronRight className="ml-1 h-3.5 w-3.5" strokeWidth={2} />
                      </Button>
                    )}
                    {phase.status === "completed" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 px-3 text-xs font-medium text-muted-foreground/60 hover:text-foreground"
                      >
                        View
                        <ChevronRight className="ml-1 h-3.5 w-3.5" strokeWidth={2} />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  {phase.deliverables.length > 0 && (
                    <div className="inline-flex items-center gap-2 text-muted-foreground/60">
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span>{pluralize(phase.deliverables.length, "deliverable")}</span>
                    </div>
                  )}

                  {phase.dependencies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-muted-foreground/55">Depends on</span>
                      {phase.dependencies.map((dep) => {
                        const depPhase = detail.phases.find((p) => p.type === dep)
                        const depDone = depPhase?.status === "completed"

                        return (
                          <span
                            key={dep}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium",
                              depDone
                                ? "bg-emerald-500/10 text-emerald-500"
                                : cfg.dependency,
                            )}
                          >
                            <CheckCircle2 className="h-3 w-3" strokeWidth={2.4} />
                            {depPhase?.label || dep}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>

                {phase.status === "in_progress" && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground/60">Progress</span>
                      <span className="font-semibold text-foreground">{phase.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted/25">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
