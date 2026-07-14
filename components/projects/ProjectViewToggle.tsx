"use client"

import { List, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewMode = "list" | "grid"

interface ProjectViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ProjectViewToggle({ mode, onChange }: ProjectViewToggleProps) {
  return (
    <div className="flex items-center rounded-xl border border-border/30 bg-card/20 p-0.5">
      <button
        onClick={() => onChange("list")}
        className={cn(
          "rounded-lg p-1.5 transition-all duration-200",
          mode === "list"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground/40 hover:text-muted-foreground/70",
        )}
        aria-label="List view"
      >
        <List className="h-4 w-4" strokeWidth={1.8} />
      </button>
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "rounded-lg p-1.5 transition-all duration-200",
          mode === "grid"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground/40 hover:text-muted-foreground/70",
        )}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>
  )
}
