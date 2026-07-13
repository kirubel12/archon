import type { Project, ActivityItem, ChartDataPoint, ActivitySummary, AIInsight } from "./types"

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
