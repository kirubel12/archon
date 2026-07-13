"use client"

import type { Project } from "@/lib/dashboard/types"
import { PRD_TYPES, PRD_LABELS, getProjectMetrics } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  return `${days}d ago`
}

function StatusDots({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-0">
      {PRD_TYPES.map((type, i) => {
        const prd = project.prds.find((p) => p.type === type)
        const isCompleted = prd?.status === "completed"
        const isDraft = prd?.status === "draft"

        return (
          <div key={type} className="flex items-center">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full ring-2 ring-background transition-colors duration-200",
                isCompleted && "bg-primary",
                isDraft && "bg-foreground/30",
                !prd && "bg-muted-foreground/20",
              )}
            />
            {i < PRD_TYPES.length - 1 && (
              <span
                className={cn(
                  "mx-0.5 h-px w-2 transition-colors duration-200",
                  isCompleted ? "bg-primary/60" : "bg-border/50",
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function StatusLabels({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {PRD_TYPES.map((type) => {
        const prd = project.prds.find((p) => p.type === type)
        const isCompleted = prd?.status === "completed"
        const isDraft = prd?.status === "draft"

        return (
          <span key={type} className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isCompleted && "bg-primary",
                isDraft && "bg-foreground/25",
                !prd && "bg-muted-foreground/15",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                isCompleted && "text-foreground/65",
                isDraft && "text-foreground/45",
                !prd && "text-muted-foreground/35",
              )}
            >
              {PRD_LABELS[type]}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default function ProjectRow({ project }: { project: Project }) {
  const { completed, total, isComplete, nextType } = getProjectMetrics(project)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  const nextLabel = nextType ? PRD_LABELS[nextType] : null
  const nextExists = nextType
    ? project.prds.some((p) => p.type === nextType)
    : false

  return (
    <div className="group rounded-2xl border border-border/30 bg-card/40 px-5 py-4.5 transition-all duration-200 hover:bg-card/80 hover:border-border/60 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <StatusDots project={project} />
            <h3 className="truncate text-base font-semibold text-foreground">
              {project.name}
            </h3>
            <span className="shrink-0 text-[11px] font-medium text-muted-foreground/70">
              {timeAgo(project.createdAt)}
            </span>
          </div>

          <div className="mt-2.5">
            <StatusLabels project={project} />
          </div>
        </div>

        <div className="shrink-0 max-sm:hidden">
          {isComplete && !project.roadmapGenerated && (
            <Button size="sm" className="h-8 text-xs px-2.5">Generate Roadmap</Button>
          )}
          {isComplete && project.roadmapGenerated && (
            <Button size="sm" variant="outline" className="h-8 text-xs px-2.5">View Roadmap</Button>
          )}
          {!isComplete && nextLabel && (
            <Button size="sm" variant={nextExists ? "ghost" : "default"} className="h-8 text-xs px-2.5">
              {nextExists ? "Continue" : "Create"}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-3">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-muted/40">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/80">
          {completed}/{total}
        </span>
      </div>

      {!isComplete && nextLabel && (
        <div className="mt-3 sm:hidden">
          <Button size="sm" variant={nextExists ? "outline" : "default"} className="w-full h-8 text-xs">
            {nextExists ? `Continue ${nextLabel}` : `Create ${nextLabel}`}
          </Button>
        </div>
      )}
      {isComplete && (
        <div className="mt-3 sm:hidden">
          <Button size="sm" variant="outline" className="w-full h-8 text-xs">
            {project.roadmapGenerated ? "View Roadmap" : "Generate Roadmap"}
          </Button>
        </div>
      )}
    </div>
  )
}
