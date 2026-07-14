"use client"

import type { Project, ProjectDetailData } from "@/lib/dashboard/types"
import ProjectHeader from "./ProjectHeader"
import ProjectOverviewCards from "./ProjectOverviewCards"
import ProjectIntelligenceCard from "./ProjectIntelligenceCard"
import ProjectWorkflowCard from "./ProjectWorkflowCard"

interface ProjectDetailsDashboardProps {
  project: Project
  detail: ProjectDetailData
}

export default function ProjectDetailsDashboard({ project, detail }: ProjectDetailsDashboardProps) {
  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      <ProjectOverviewCards project={project} detail={detail} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ProjectWorkflowCard detail={detail} />
        <ProjectIntelligenceCard insights={detail.insights} />
      </div>
    </div>
  )
}
