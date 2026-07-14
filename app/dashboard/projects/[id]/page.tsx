import DashboardLayout from "../../../../components/dashboard/DashboardLayout"
import { mockProjects } from "@/lib/dashboard/mock-data"
import { mockProjectDetail } from "@/lib/dashboard/mock-data"
import {
  PRD_TYPES,
  PRD_ORDER,
  type Project,
  type ProjectDetailData,
} from "@/lib/dashboard/types"
import { notFound } from "next/navigation"
import ProjectDetailsDashboard from "../../../../components/projects/details/ProjectDetailsDashboard"

function buildDefaultDetail(project: Project): ProjectDetailData {
  const sorted = [...PRD_TYPES].sort((a, b) => PRD_ORDER[a] - PRD_ORDER[b])
  const phases = sorted.map((type, i) => {
    const prd = project.prds.find((p) => p.type === type)
    const prev = i > 0 ? sorted[i - 1] : null
    const prevDone = prev ? project.prds.some((p) => p.type === prev && p.status === "completed") : true

    if (prd?.status === "completed") {
      return {
        type,
        label: type === "general" ? "General PRD" : type === "design" ? "Design PRD" : type === "ai_workflow" ? "AI Workflow" : "Tech Stack",
        status: "completed" as const,
        progress: 100,
        startedAt: prd.createdAt,
        completedAt: prd.updatedAt,
        dependencies: prev ? [prev] : [],
        deliverables: [`${type} document`],
      }
    }
    if (prd?.status === "draft") {
      return {
        type,
        label: type === "general" ? "General PRD" : type === "design" ? "Design PRD" : type === "ai_workflow" ? "AI Workflow" : "Tech Stack",
        status: prevDone ? ("in_progress" as const) : ("blocked" as const),
        progress: prevDone ? 40 : 0,
        startedAt: prd.createdAt,
        dependencies: prev ? [prev] : [],
        deliverables: [`${type} document`],
      }
    }
    return {
      type,
      label: type === "general" ? "General PRD" : type === "design" ? "Design PRD" : type === "ai_workflow" ? "AI Workflow" : "Tech Stack",
      status: (prevDone ? "not_started" : "blocked") as "not_started" | "blocked",
      progress: 0,
      dependencies: prev ? [prev] : [],
      deliverables: [`${type} document`],
    }
  })

  const completedCount = project.prds.filter((p) => p.status === "completed").length
  const percentage = Math.round((completedCount / PRD_TYPES.length) * 100)

  return {
    phases,
    activity: [],
    analytics: {
      progressHistory: [
        { date: "Start", value: 0 },
        { date: "Now", value: percentage },
      ],
      documentHistory: [
        { date: "Start", count: 0 },
        { date: "Now", count: project.prds.length },
      ],
      activityTrend: [
        { date: "Mon", events: 0 },
        { date: "Tue", events: 0 },
        { date: "Wed", events: 0 },
        { date: "Thu", events: 0 },
        { date: "Fri", events: 0 },
        { date: "Sat", events: 0 },
        { date: "Sun", events: 0 },
      ],
    },
    health: {
      trend: "stable",
      riskLevel: "low",
      readinessScore: percentage,
      staleDocuments: 0,
      blockers: phases.filter((p) => p.status === "blocked").map((p) => `${p.label} blocked by dependencies`),
    },
    insights: [
      {
        type: "recommendation",
        headline: `${completedCount} of ${PRD_TYPES.length} phases completed`,
        description: `${percentage}% overall progress. Continue working through the remaining phases to generate your roadmap.`,
        impact: "medium",
      },
    ],
    assets: project.prds.map((prd) => ({
      id: `asset-${prd.id}`,
      type: prd.type === "general" || prd.type === "tech_stack" ? "prd" as const : prd.type === "design" ? "design" as const : "workflow" as const,
      name: prd.content.slice(0, 40) + "...",
      status: prd.status === "completed" ? ("completed" as const) : ("draft" as const),
      createdAt: prd.createdAt,
      size: "—",
    })),
    teamSize: 1,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)

  if (!project) notFound()

  const detail = mockProjectDetail(id) ?? buildDefaultDetail(project)

  return (
    <DashboardLayout>
      <ProjectDetailsDashboard project={project} detail={detail} />
    </DashboardLayout>
  )
}
