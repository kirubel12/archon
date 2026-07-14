"use client"

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
import { Button } from "@/components/ui/button"
import { Share2, MoreHorizontal } from "lucide-react"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  return `${days}d ago`
}

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { completed, total, isComplete, nextType } = getProjectMetrics(project)
  const status = getProjectStatus(project)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  const nextLabel = nextType ? PRD_SHORT[nextType] : null
  const nextExists = nextType ? project.prds.some((p) => p.type === nextType) : false

  return (
    <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-card/50 to-card/30 p-7 transition-all duration-300 hover:border-border/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-semibold tracking-tight text-foreground truncate">
              {project.name}
            </h1>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium shrink-0",
                STATUS_BG[status],
                STATUS_COLORS[status],
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
              {STATUS_LABELS[status]}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground/70 max-w-2xl">
            {project.description}
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            {PRD_TYPES.map((type, i) => {
              const prd = project.prds.find((p) => p.type === type)
              const isC = prd?.status === "completed"
              const isD = prd?.status === "draft"
              return (
                <div key={type} className="flex items-center gap-2.5">
                  {i > 0 && (
                    <span className="text-muted-foreground/20 text-[10px]">→</span>
                  )}
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full ring-[3px] ring-background transition-all duration-300",
                      isC && "bg-primary",
                      isD && "bg-foreground/40",
                      !prd && "bg-foreground/10",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isC && "text-foreground/75",
                      isD && "text-foreground/50",
                      !prd && "text-muted-foreground/40",
                    )}
                  >
                    {PRD_SHORT[type]}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-muted/25">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-semibold tabular-nums text-muted-foreground/75">
                {percentage}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground/55">
              Updated {timeAgo(project.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isComplete && !project.roadmapGenerated && (
            <Button size="sm" className="h-8 text-xs px-3.5 font-medium">
              Generate Roadmap
            </Button>
          )}
          {!isComplete && nextLabel && (
            <Button size="sm" className="h-8 text-xs px-3.5 font-medium">
              {nextExists ? `Continue ${nextLabel}` : `Create ${nextLabel}`}
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-border/40 hover:border-border/60">
            <Share2 className="h-3.5 w-3.5" strokeWidth={1.8} />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
          </Button>
        </div>
      </div>
    </div>
  )
}
