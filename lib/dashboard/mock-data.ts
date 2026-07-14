import type { Project, ActivityItem, ChartDataPoint, ActivitySummary, AIInsight, ProjectDetailData } from "./types"

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "E-commerce Platform Redesign",
    description: "Full redesign of the customer-facing storefront and checkout flow",
    createdAt: "2026-06-28T10:00:00Z",
    roadmapGenerated: false,
    prds: [
      {
        id: "prd-1-g",
        type: "general",
        content: "General product requirements for the e-commerce redesign...",
        status: "completed",
        createdAt: "2026-06-28T14:00:00Z",
        updatedAt: "2026-07-01T09:00:00Z",
      },
      {
        id: "prd-1-d",
        type: "design",
        content: "Design system updates and UI component specifications...",
        status: "draft",
        createdAt: "2026-07-02T11:00:00Z",
        updatedAt: "2026-07-05T16:00:00Z",
      },
    ],
  },
  {
    id: "proj-2",
    name: "Internal Analytics Dashboard",
    description: "Real-time metrics dashboard for the operations team",
    createdAt: "2026-07-01T08:00:00Z",
    roadmapGenerated: true,
    prds: [
      {
        id: "prd-2-g",
        type: "general",
        content: "General requirements for internal analytics...",
        status: "completed",
        createdAt: "2026-07-01T12:00:00Z",
        updatedAt: "2026-07-03T10:00:00Z",
      },
      {
        id: "prd-2-d",
        type: "design",
        content: "Dashboard layout and visualization specifications...",
        status: "completed",
        createdAt: "2026-07-03T14:00:00Z",
        updatedAt: "2026-07-06T11:00:00Z",
      },
      {
        id: "prd-2-a",
        type: "ai_workflow",
        content: "AI-powered anomaly detection pipeline...",
        status: "completed",
        createdAt: "2026-07-06T15:00:00Z",
        updatedAt: "2026-07-09T09:00:00Z",
      },
      {
        id: "prd-2-t",
        type: "tech_stack",
        content: "Technology stack decisions for the analytics platform...",
        status: "completed",
        createdAt: "2026-07-09T10:00:00Z",
        updatedAt: "2026-07-11T14:00:00Z",
      },
    ],
  },
  {
    id: "proj-3",
    name: "Mobile API Gateway",
    description: "Unified API gateway for mobile application backends",
    createdAt: "2026-07-05T09:00:00Z",
    roadmapGenerated: false,
    prds: [
      {
        id: "prd-3-g",
        type: "general",
        content: "General requirements for the API gateway...",
        status: "completed",
        createdAt: "2026-07-05T13:00:00Z",
        updatedAt: "2026-07-07T10:00:00Z",
      },
      {
        id: "prd-3-d",
        type: "design",
        content: "API gateway architecture and endpoint design...",
        status: "completed",
        createdAt: "2026-07-07T14:00:00Z",
        updatedAt: "2026-07-10T11:00:00Z",
      },
      {
        id: "prd-3-a",
        type: "ai_workflow",
        content: "AI-based rate limiting and request routing...",
        status: "completed",
        createdAt: "2026-07-10T15:00:00Z",
        updatedAt: "2026-07-12T09:00:00Z",
      },
    ],
  },
  {
    id: "proj-4",
    name: "Customer Portal v2",
    description: "Self-service customer portal with ticket management",
    createdAt: "2026-07-10T10:00:00Z",
    roadmapGenerated: false,
    prds: [],
  },
]

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "prd_completed",
    description: "Completed Tech Stack PRD for Internal Analytics",
    timestamp: "2026-07-11T14:00:00Z",
  },
  {
    id: "act-2",
    type: "prd_started",
    description: "Started Design PRD for E-commerce Platform",
    timestamp: "2026-07-02T11:00:00Z",
  },
  {
    id: "act-3",
    type: "roadmap_generated",
    description: "Generated roadmap for Internal Analytics Dashboard",
    timestamp: "2026-07-11T15:00:00Z",
  },
  {
    id: "act-4",
    type: "project_created",
    description: "Created Customer Portal v2 project",
    timestamp: "2026-07-10T10:00:00Z",
  },
  {
    id: "act-5",
    type: "prd_completed",
    description: "Completed AI Workflow PRD for Mobile API Gateway",
    timestamp: "2026-07-12T09:00:00Z",
  },
  {
    id: "act-6",
    type: "project_created",
    description: "Created Mobile API Gateway project",
    timestamp: "2026-07-05T09:00:00Z",
  },
]

export const mockChartData: ChartDataPoint[] = [
  { name: "Mon", activity: 3 },
  { name: "Tue", activity: 7 },
  { name: "Wed", activity: 2 },
  { name: "Thu", activity: 9 },
  { name: "Fri", activity: 5 },
  { name: "Sat", activity: 4 },
  { name: "Sun", activity: 6 },
]

export const mockActivitySummary: ActivitySummary = {
  prdsCreated: 12,
  roadmapUpdates: 8,
  aiWorkflows: 5,
  progressChanges: 14,
}

export const mockAIInsights: AIInsight[] = [
  {
    id: "insight-1",
    headline: "Planning phase is your bottleneck",
    description:
      "Your projects spend 60% of their time in the planning phase before any PRDs are completed. This delays downstream work and slows overall delivery.",
    recommendations: [
      "Complete the pending Design PRD for E-commerce Platform",
      "Start AI Workflow PRD for Mobile API Gateway",
    ],
  },
  {
    id: "insight-2",
    headline: "2 projects need attention",
    description:
      "Customer Portal v2 and Mobile API Gateway have been idle for 3+ days without updates. Unblock these to keep momentum.",
    recommendations: [
      "Create the initial PRD for Customer Portal v2",
      "Review open requirements for Mobile API Gateway",
    ],
  },
]

export function mockProjectDetail(projectId: string): ProjectDetailData | undefined {
  if (projectId !== "proj-1") return undefined

  return {
    phases: [
      {
        type: "general",
        label: "General PRD",
        status: "completed",
        progress: 100,
        startedAt: "2026-06-28T14:00:00Z",
        completedAt: "2026-07-01T09:00:00Z",
        dependencies: [],
        deliverables: ["Product requirements document", "Stakeholder sign-off"],
      },
      {
        type: "design",
        label: "Design PRD",
        status: "in_progress",
        progress: 65,
        startedAt: "2026-07-02T11:00:00Z",
        dependencies: ["general"],
        deliverables: ["Design system spec", "UI component library", "Prototype"],
      },
      {
        type: "ai_workflow",
        label: "AI Workflow",
        status: "not_started",
        progress: 0,
        dependencies: ["design"],
        deliverables: ["AI model specs", "Data pipeline design", "Training workflow"],
      },
      {
        type: "tech_stack",
        label: "Tech Stack",
        status: "not_started",
        progress: 0,
        dependencies: ["ai_workflow"],
        deliverables: ["Technology decisions", "Architecture diagram", "Migration plan"],
      },
    ],
    activity: [
      {
        id: "evt-1",
        type: "project_created",
        description: "Project created",
        timestamp: "2026-06-28T10:00:00Z",
      },
      {
        id: "evt-2",
        type: "prd_completed",
        description: "Completed General PRD",
        timestamp: "2026-07-01T09:00:00Z",
      },
      {
        id: "evt-3",
        type: "prd_started",
        description: "Started Design PRD",
        timestamp: "2026-07-02T11:00:00Z",
      },
      {
        id: "evt-4",
        type: "prd_completed",
        description: "Completed PRD milestone review",
        timestamp: "2026-07-04T14:00:00Z",
      },
      {
        id: "evt-5",
        type: "prd_completed",
        description: "Updated Design PRD with stakeholder feedback",
        timestamp: "2026-07-05T16:00:00Z",
      },
      {
        id: "evt-6",
        type: "prd_completed",
        description: "Design PRD draft v2 committed",
        timestamp: "2026-07-07T11:00:00Z",
      },
      {
        id: "evt-7",
        type: "prd_completed",
        description: "Generated AI recommendations for design",
        timestamp: "2026-07-09T10:00:00Z",
      },
      {
        id: "evt-8",
        type: "prd_started",
        description: "Final review of Design PRD initiated",
        timestamp: "2026-07-10T15:00:00Z",
      },
    ],
    analytics: {
      progressHistory: [
        { date: "Jun 28", value: 0 },
        { date: "Jun 30", value: 20 },
        { date: "Jul 02", value: 25 },
        { date: "Jul 04", value: 35 },
        { date: "Jul 06", value: 40 },
        { date: "Jul 08", value: 45 },
        { date: "Jul 10", value: 50 },
        { date: "Jul 12", value: 50 },
        { date: "Jul 14", value: 50 },
      ],
      documentHistory: [
        { date: "Jun 28", count: 1 },
        { date: "Jun 30", count: 2 },
        { date: "Jul 02", count: 3 },
        { date: "Jul 04", count: 3 },
        { date: "Jul 06", count: 4 },
        { date: "Jul 08", count: 5 },
        { date: "Jul 10", count: 5 },
        { date: "Jul 12", count: 5 },
        { date: "Jul 14", count: 5 },
      ],
      activityTrend: [
        { date: "Mon", events: 2 },
        { date: "Tue", events: 5 },
        { date: "Wed", events: 1 },
        { date: "Thu", events: 4 },
        { date: "Fri", events: 3 },
        { date: "Sat", events: 1 },
        { date: "Sun", events: 0 },
      ],
    },
    health: {
      trend: "stable",
      riskLevel: "low",
      readinessScore: 72,
      staleDocuments: 1,
      blockers: [],
    },
    insights: [
      {
        type: "bottleneck",
        headline: "Design PRD completion is the critical path",
        description:
          "The Design PRD has been in draft for 12 days. Completing it will unblock AI Workflow and Tech Stack phases, which account for 50% of total project scope.",
        impact: "high",
        actionLabel: "Complete Design PRD",
      },
      {
        type: "recommendation",
        headline: "AI Workflow dependencies are unresolved",
        description:
          "The AI Workflow phase depends on Design PRD deliverables. Consider starting preliminary research in parallel to reduce idle time.",
        impact: "medium",
        actionLabel: "View recommendations",
      },
      {
        type: "optimization",
        headline: "Documentation cadence is healthy",
        description:
          "You have generated 5 documents in 16 days. Maintaining this pace will complete the project within the estimated timeline.",
        impact: "low",
      },
      {
        type: "achievement",
        headline: "First milestone achieved",
        description:
          "The General PRD was completed ahead of schedule. This strong start has built momentum for the remaining phases.",
        impact: "low",
      },
    ],
    assets: [
      {
        id: "asset-1",
        type: "prd",
        name: "Product Requirements Document",
        status: "completed",
        createdAt: "2026-07-01T09:00:00Z",
        size: "2.4 MB",
      },
      {
        id: "asset-2",
        type: "design",
        name: "Design System Specifications",
        status: "draft",
        createdAt: "2026-07-05T16:00:00Z",
        size: "1.8 MB",
      },
      {
        id: "asset-3",
        type: "design",
        name: "UI Component Library",
        status: "draft",
        createdAt: "2026-07-07T11:00:00Z",
        size: "4.2 MB",
      },
      {
        id: "asset-4",
        type: "spec",
        name: "Technical Architecture Overview",
        status: "completed",
        createdAt: "2026-07-03T10:00:00Z",
        size: "892 KB",
      },
      {
        id: "asset-5",
        type: "export",
        name: "PRD Export (PDF)",
        status: "generated",
        createdAt: "2026-07-10T10:00:00Z",
        size: "3.1 MB",
      },
    ],
    teamSize: 1,
  }
}
