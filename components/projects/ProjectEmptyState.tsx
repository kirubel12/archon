"use client"

import { FolderKanban } from "lucide-react"
import { Button } from "../ui/button"

interface ProjectEmptyStateProps {
  isFiltered?: boolean
}

export default function ProjectEmptyState({ isFiltered = false }: ProjectEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border/30 py-24 text-center transition-colors hover:border-border/50">
      <FolderKanban className="mx-auto h-10 w-10 text-muted-foreground/25" strokeWidth={1.5} />
      {isFiltered ? (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            No projects match your search
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground/50">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            No projects yet
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground/50">
            Create your first project to get started building your roadmap.
          </p>
          <Button size="sm" className="mt-6 h-8 text-xs px-3">
            <FolderKanban className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.8} />
            New project
          </Button>
        </div>
      )}
    </div>
  )
}
