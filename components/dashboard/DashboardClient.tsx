"use client"

import type { Project } from "@/lib/dashboard/types"
import { computeMetrics } from "@/lib/dashboard/types"
import { mockProjects, mockChartData, mockActivitySummary, mockAIInsights } from "@/lib/dashboard/mock-data"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import StatCards from "./StatCards"
import ActivityInsights from "./ActivityInsights"
import ProjectRow from "../projects/ProjectRow"

export default function DashboardClient({ name }: { name: string }) {
  const projects: Project[] = mockProjects
  const metrics = computeMetrics(projects)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-[15px] font-medium text-muted-foreground">
          Here&apos;s an overview of your projects and activity.
        </p>
      </div>

      <StatCards metrics={metrics} />

      <ActivityInsights
        chartData={mockChartData}
        summary={mockActivitySummary}
        insight={mockAIInsights[0]}
      />

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
              Recent Projects
            </h2>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"} in progress
            </p>
          </div>
          <Button size="sm" variant="ghost" className="text-xs font-semibold">
            <Plus className="mr-1 h-3.5 w-3.5" />
            New project
          </Button>
        </div>

        {projects.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-border/50 py-20 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No projects yet. Create your first project to get started.
            </p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-4 space-y-3">
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
