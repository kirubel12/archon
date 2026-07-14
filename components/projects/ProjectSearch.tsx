"use client"

import { Search } from "lucide-react"

interface ProjectSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" strokeWidth={1.8} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="h-9 w-full rounded-xl border border-border/30 bg-card/30 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/30 transition-all duration-200 hover:border-border/50 focus:border-primary/40 focus:bg-card/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
