export const PRD_TYPES = ["general", "design", "ai_workflow", "tech_stack"] as const

export type PRDType = (typeof PRD_TYPES)[number]

export const PRD_LABELS: Record<PRDType, string> = {
  general: "General PRD",
  design: "Design PRD",
  ai_workflow: "AI Workflow",
  tech_stack: "Tech Stack",
}

export const PRD_SHORT: Record<PRDType, string> = {
  general: "General",
  design: "Design",
  ai_workflow: "AI",
  tech_stack: "Tech",
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
  activity: number
}

export interface ActivitySummary {
  prdsCreated: number
  roadmapUpdates: number
  aiWorkflows: number
  progressChanges: number
}

export type ProjectStatus = "draft" | "active" | "review" | "completed" | "blocked"

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  active: "Active",
  review: "Review",
  completed: "Completed",
  blocked: "Blocked",
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  draft: "text-muted-foreground/60",
  active: "text-primary",
  review: "text-amber-500",
  completed: "text-emerald-500",
  blocked: "text-red-500",
}

export const STATUS_BG: Record<ProjectStatus, string> = {
  draft: "bg-muted-foreground/8",
  active: "bg-primary/8",
  review: "bg-amber-500/8",
  completed: "bg-emerald-500/8",
  blocked: "bg-red-500/8",
}

export const STATUS_DOT: Record<ProjectStatus, string> = {
  draft: "bg-muted-foreground/40",
  active: "bg-primary",
  review: "bg-amber-500",
  completed: "bg-emerald-500",
  blocked: "bg-red-500",
}

export function getProjectStatus(project: Project): ProjectStatus {
  const { isComplete } = getProjectMetrics(project)
  if (project.prds.length === 0) return "draft"
  if (isComplete && project.roadmapGenerated) return "completed"
  if (isComplete && !project.roadmapGenerated) return "review"
  const lastActivity = project.prds.reduce((latest, prd) => {
    const d = new Date(prd.updatedAt).getTime()
    return d > latest ? d : latest
  }, new Date(project.createdAt).getTime())
  const daysSinceUpdate = Math.floor((Date.now() - lastActivity) / 86400000)
  if (daysSinceUpdate >= 7) return "blocked"
  return "active"
}

export interface AIInsight {
  id: string
  headline: string
  description: string
  recommendations: string[]
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

export interface WorkflowPhase {
  type: PRDType
  label: string
  status: "not_started" | "in_progress" | "completed" | "blocked"
  progress: number
  startedAt?: string
  completedAt?: string
  dependencies: PRDType[]
  deliverables: string[]
}

export interface DetailAnalytics {
  progressHistory: { date: string; value: number }[]
  documentHistory: { date: string; count: number }[]
  activityTrend: { date: string; events: number }[]
}

export interface ProjectHealthMetrics {
  trend: "improving" | "stable" | "declining"
  riskLevel: "low" | "medium" | "high"
  readinessScore: number
  staleDocuments: number
  blockers: string[]
}

export interface IntelligenceInsight {
  type: "bottleneck" | "recommendation" | "optimization" | "warning" | "achievement"
  headline: string
  description: string
  impact: "high" | "medium" | "low"
  actionLabel?: string
}

export interface ProjectAsset {
  id: string
  type: "prd" | "design" | "workflow" | "spec" | "export" | "attachment"
  name: string
  status: "draft" | "completed" | "generated"
  createdAt: string
  size?: string
}

export interface ProjectDetailData {
  phases: WorkflowPhase[]
  activity: ActivityItem[]
  analytics: DetailAnalytics
  health: ProjectHealthMetrics
  insights: IntelligenceInsight[]
  assets: ProjectAsset[]
  teamSize: number
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
