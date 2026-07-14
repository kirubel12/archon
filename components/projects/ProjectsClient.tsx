"use client"

import { useState, useMemo } from "react"
import type { Project, DashboardMetrics } from "@/lib/dashboard/types"
import { PRD_TYPES } from "@/lib/dashboard/types"
import {
  ProjectHeader,
  ProjectStats,
  ProjectSearch,
  ProjectFilters,
  ProjectSort,
  ProjectViewToggle,
  ProjectGrid,
  ProjectEmptyState,
  ProjectSkeleton,
  ProjectIntelligenceCard,
  ProjectRow,
} from "./"
import type { FilterStatus } from "./ProjectFilters"
import type { SortKey } from "./ProjectSort"
import type { ViewMode } from "./ProjectViewToggle"
import { cn } from "@/lib/utils"

interface ProjectsClientProps {
  projects: Project[]
  metrics: DashboardMetrics
}

function filterProjects(projects: Project[], status: FilterStatus) {
  if (status === "all") return projects
  return projects.filter((p) => {
    const allComplete = PRD_TYPES.every(
      (type) => p.prds?.find((prd) => prd.type === type)?.status === "completed",
    )
    return status === "completed" ? allComplete : !allComplete
  })
}

function sortProjects(projects: Project[], key: SortKey) {
  const sorted = [...projects]
  switch (key) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "updated":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case "progress": {
      return sorted.sort((a, b) => {
        const aComplete = PRD_TYPES.filter(
          (t) => a.prds?.find((prd) => prd.type === t)?.status === "completed",
        ).length
        const bComplete = PRD_TYPES.filter(
          (t) => b.prds?.find((prd) => prd.type === t)?.status === "completed",
        ).length
        return bComplete - aComplete
      })
    }
  }
}

export default function ProjectsClient({ projects, metrics }: ProjectsClientProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [sort, setSort] = useState<SortKey>("updated")
  const [view, setView] = useState<ViewMode>("list")
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    const searched = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
    return sortProjects(filterProjects(searched, filter), sort)
  }, [projects, search, filter, sort])

  const handleFilterChange = (status: FilterStatus) => {
    setLoading(true)
    setFilter(status)
    setTimeout(() => setLoading(false), 200)
  }

  return (
    <div className="space-y-8">
      <ProjectHeader count={projects.length} />
      <ProjectStats metrics={metrics} />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <ProjectSearch value={search} onChange={setSearch} />
          <ProjectFilters active={filter} onChange={handleFilterChange} />
        </div>
        <div className="flex items-center gap-3">
          <ProjectSort active={sort} onChange={setSort} />
          <ProjectViewToggle mode={view} onChange={setView} />
        </div>
      </div>

      {loading ? (
        <ProjectSkeleton />
      ) : filtered.length === 0 ? (
        <ProjectEmptyState isFiltered={search !== "" || filter !== "all"} />
      ) : view === "grid" ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/20 bg-card/20 py-2">
          {filtered.map((project, i) => (
            <div key={project.id} className={cn(i > 0 && "border-t border-border/15")}>
              <ProjectRow project={project} variant="list" />
            </div>
          ))}
        </div>
      )}

      <ProjectIntelligenceCard metrics={metrics} />
    </div>
  )
}
