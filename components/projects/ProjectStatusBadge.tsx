"use client"

import type { Project } from "@/lib/dashboard/types"
import {
  getProjectStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_BG,
  STATUS_DOT,
} from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"

interface ProjectStatusBadgeProps {
  project: Project
  size?: "sm" | "md"
}

export default function ProjectStatusBadge({ project, size = "md" }: ProjectStatusBadgeProps) {
  const status = getProjectStatus(project)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        STATUS_BG[status],
        STATUS_COLORS[status],
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-[11px]",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
      {STATUS_LABELS[status]}
    </span>
  )
}
