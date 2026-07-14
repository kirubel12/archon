"use client"

import { Button } from "../ui/button"
import { Plus } from "lucide-react"

interface ProjectHeaderProps {
  count: number
}

export default function ProjectHeader({ count }: ProjectHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground/70">
          {count} {count === 1 ? "project" : "projects"} total
        </p>
      </div>
      <Button size="sm" className="h-8 text-xs px-3">
        <Plus className="mr-1.5 h-3.5 w-3.5" />
        New project
      </Button>
    </div>
  )
}
