"use client"

import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type SortKey = "name" | "updated" | "progress"

interface ProjectSortProps {
  active: SortKey
  onChange: (key: SortKey) => void
}

const options: { label: string; value: SortKey }[] = [
  { label: "Name", value: "name" },
  { label: "Updated", value: "updated" },
  { label: "Progress", value: "progress" },
]

export default function ProjectSort({ active, onChange }: ProjectSortProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/40" strokeWidth={1.6} />
      <div className="flex items-center gap-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg px-2 py-1 text-xs font-medium transition-all duration-200",
              active === opt.value
                ? "text-foreground"
                : "text-muted-foreground/40 hover:text-muted-foreground/70",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
