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
import ProjectProgress from "./ProjectProgress"
import ProjectActions from "./ProjectActions"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  return `${days}d ago`
}

export default function ProjectCard({ project }: { project: Project }) {
  const { completed, total, isComplete, nextType } = getProjectMetrics(project)
  const status = getProjectStatus(project)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  const nextLabel = nextType ? PRD_SHORT[nextType] : null
  const nextExists = nextType ? project.prds.some((p) => p.type === nextType) : false

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="group block rounded-2xl border border-border/25 bg-card/40 p-6 transition-all duration-200 hover:bg-card/70 hover:border-border/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
    >
      <div className="flex items-center justify-between gap-4">
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
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            STATUS_BG[status],
            STATUS_COLORS[status],
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {PRD_TYPES.map((type) => {
          const prd = project.prds.find((p) => p.type === type)
          const isC = prd?.status === "completed"
          return (
            <span
              key={type}
              className={cn(
                "text-[11px] font-medium",
                isC ? "text-foreground/60" : "text-muted-foreground/35",
              )}
            >
              {PRD_SHORT[type]}
            </span>
          )
        })}
      </div>

      <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-foreground line-clamp-1">
        {project.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground/65 line-clamp-2">
        {project.description}
      </p>

      <div className="mt-6">
        <ProjectProgress completed={completed} total={total} percentage={percentage} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/15 pt-4">
        <span className="text-[11px] font-medium text-muted-foreground/45">
          Updated {timeAgo(project.createdAt)}
        </span>
        <ProjectActions
          isComplete={isComplete}
          roadmapGenerated={project.roadmapGenerated}
          nextLabel={nextLabel}
          nextExists={nextExists}
        />
      </div>
    </Link>
  )
}
