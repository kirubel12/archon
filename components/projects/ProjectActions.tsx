"use client"

import { Button } from "../ui/button"

interface ProjectActionsProps {
  isComplete: boolean
  roadmapGenerated: boolean
  nextLabel: string | null
  nextExists: boolean
}

export default function ProjectActions({
  isComplete,
  roadmapGenerated,
  nextLabel,
  nextExists,
}: ProjectActionsProps) {
  if (isComplete && !roadmapGenerated) {
    return (
      <Button size="sm" className="h-7 text-[11px] px-2.5 font-medium">
        Generate Roadmap
      </Button>
    )
  }

  if (isComplete && roadmapGenerated) {
    return (
      <Button size="sm" variant="outline" className="h-7 text-[11px] px-2.5 font-medium">
        View Roadmap
      </Button>
    )
  }

  if (nextLabel) {
    return (
      <Button size="sm" variant={nextExists ? "ghost" : "default"} className="h-7 text-[11px] px-2.5 font-medium">
        {nextExists ? "Continue" : `Create ${nextLabel}`}
      </Button>
    )
  }

  return null
}
