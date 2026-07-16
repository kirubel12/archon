"use client"

import Link from "next/link"
import type { Project } from "@/lib/dashboard/types"
import {
  PRD_TYPES,
  PRD_SHORT,
  getProjectMetrics,
  getProjectStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_BG,
  STATUS_DOT,
} from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  return `${days}d ago`
}

function StageDots({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-0.5">
      {PRD_TYPES.map((type, i) => {
        const prd = project.prds.find((p) => p.type === type)
        const isC = prd?.status === "completed"
        const isD = prd?.status === "draft"
        return (
          <div key={type} className="flex items-center">
            <span
              className={cn(
                "h-2 w-2 rounded-full ring-[3px] ring-background transition-colors duration-200",
                isC && "bg-primary",
                isD && "bg-foreground/35",
                !prd && "bg-foreground/8",
              )}
            />
            {i < PRD_TYPES.length - 1 && (
              <span
                className={cn(
                  "mx-1 h-px w-3 transition-colors duration-200",
                  isC ? "bg-primary/50" : "bg-border/35",
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function StageLabels({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {PRD_TYPES.map((type) => {
        const prd = project.prds.find((p) => p.type === type)
        const isC = prd?.status === "completed"
        const isD = prd?.status === "draft"
        return (
          <span key={type} className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isC && "bg-primary",
                isD && "bg-foreground/25",
                !prd && "bg-foreground/10",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                isC && "text-foreground/60",
                isD && "text-foreground/40",
                !prd && "text-muted-foreground/30",
              )}
            >
              {PRD_SHORT[type]}
            </span>
          </span>
        )
      })}
    </div>
  )
}

interface ProjectRowProps {
  project: Project
  variant?: "card" | "list"
}

export default function ProjectRow({ project, variant = "card" }: ProjectRowProps) {
  const { completed, total, isComplete, nextType } = getProjectMetrics(project)
  const status = getProjectStatus(project)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  const nextLabel = nextType ? PRD_SHORT[nextType] : null
  const nextExists = nextType ? project.prds.some((p) => p.type === nextType) : false

  const isList = variant === "list"
  const containerClass = isList
    ? "group px-5 py-3.5 transition-colors duration-200 hover:bg-card/40 focus-visible:outline-none focus-visible:bg-card/40"
    : "group block rounded-2xl border border-border/20 bg-card/30 transition-all duration-200 hover:bg-card/60 hover:border-border/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <Link href={`/dashboard/projects/${project.id}`} className={containerClass}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <StageDots project={project} />
              <h3 className="truncate text-[15px] font-semibold tracking-tight text-foreground">
                {project.name}
              </h3>
              <span className="shrink-0 text-[11px] font-medium text-muted-foreground/45">
                {timeAgo(project.createdAt)}
              </span>
            </div>

            <div className="mt-2.5 flex items-center gap-3">
              <StageLabels project={project} />
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  STATUS_BG[status],
                  STATUS_COLORS[status],
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
                {STATUS_LABELS[status]}
              </span>
            </div>
          </div>

          <div className="shrink-0 max-sm:hidden">
            {isComplete && !project.roadmapGenerated && (
              <Button size="sm" className="h-7 text-[11px] px-2.5 font-medium">
                Generate Roadmap
              </Button>
            )}
            {isComplete && project.roadmapGenerated && (
              <Button size="sm" variant="outline" className="h-7 text-[11px] px-2.5 font-medium">
                View Roadmap
              </Button>
            )}
            {!isComplete && nextLabel && (
              <Button
                size="sm"
                variant={nextExists ? "ghost" : "default"}
                className="h-7 text-[11px] px-2.5 font-medium"
              >
                {nextExists ? `Continue ${nextLabel}` : `Create ${nextLabel}`}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-3">
          <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-muted/30">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/70">
            {completed}/{total}
          </span>
        </div>

        {!isComplete && nextLabel && (
          <div className="mt-3 sm:hidden">
            <Button size="sm" variant={nextExists ? "outline" : "default"} className="h-7 w-full text-[11px] font-medium">
              {nextExists ? `Continue ${nextLabel}` : `Create ${nextLabel}`}
            </Button>
          </div>
        )}
        {isComplete && (
          <div className="mt-3 sm:hidden">
            <Button size="sm" variant="outline" className="h-7 w-full text-[11px] font-medium">
              {project.roadmapGenerated ? "View Roadmap" : "Generate Roadmap"}
            </Button>
          </div>
        )}
      </div>
    </Link>
  )
}
