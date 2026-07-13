export const PRD_TYPES = ["general", "design", "ai_workflow", "tech_stack"] as const

export type PRDType = (typeof PRD_TYPES)[number]

export const PRD_LABELS: Record<PRDType, string> = {
  general: "General PRD",
  design: "Design PRD",
  ai_workflow: "AI Workflow",
  tech_stack: "Tech Stack",
}

export const PRD_ORDER: Record<PRDType, number> = {
  general: 0,
  design: 1,
  ai_workflow: 2,
  tech_stack: 3,
}

export interface PRD {
  id: string
  type: PRDType
  content: string
  status: "draft" | "completed"
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  prds: PRD[]
  roadmapGenerated: boolean
}

export interface DashboardMetrics {
  totalProjects: number
  inProgress: number
  complete: number
  roadmapsReady: number
}

export interface ActivityItem {
  id: string
  type: "project_created" | "prd_completed" | "prd_started" | "roadmap_generated"
  description: string
  timestamp: string
}

export interface ChartDataPoint {
  name: string
  projects: number
}

export function getProjectMetrics(project: Project): {
  completed: number
  total: number
  isComplete: boolean
  nextType: PRDType | null
} {
  const sorted = [...PRD_TYPES].sort((a, b) => PRD_ORDER[a] - PRD_ORDER[b])
  const completed = project.prds.filter((p) => p.status === "completed").length
  const total = PRD_TYPES.length

  let nextType: PRDType | null = null
  for (const type of sorted) {
    const existing = project.prds.find((p) => p.type === type)
    if (!existing || existing.status !== "completed") {
      nextType = type
      break
    }
  }

  return { completed, total, isComplete: completed === total, nextType }
}

export function computeMetrics(projects: Project[]): DashboardMetrics {
  const totalProjects = projects.length
  const complete = projects.filter((p) => getProjectMetrics(p).isComplete).length
  const inProgress = projects.filter(
    (p) => !getProjectMetrics(p).isComplete && p.prds.length > 0,
  ).length
  const roadmapsReady = projects.filter((p) => p.roadmapGenerated).length

  return { totalProjects, inProgress, complete, roadmapsReady }
}
