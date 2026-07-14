"use client"

import { cn } from "@/lib/utils"

export type FilterStatus = "all" | "in-progress" | "completed"

interface ProjectFiltersProps {
  active: FilterStatus
  onChange: (status: FilterStatus) => void
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
]

export default function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/30 bg-card/20 p-0.5">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
            active === f.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground/50 hover:text-foreground/70",
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
