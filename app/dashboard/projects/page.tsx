import DashboardLayout from "../../../components/dashboard/DashboardLayout"
import ProjectsClient from "../../../components/projects/ProjectsClient"
import { mockProjects } from "@/lib/dashboard/mock-data"
import { computeMetrics } from "@/lib/dashboard/types"

export default async function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsClient projects={mockProjects} metrics={computeMetrics(mockProjects)} />
    </DashboardLayout>
  )
}
