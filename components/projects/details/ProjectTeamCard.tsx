"use client"

import { cn } from "@/lib/utils"
import type { IntelligenceInsight } from "@/lib/dashboard/types"

interface ProjectTeamCardProps {
  insights: IntelligenceInsight[]
  teamSize: number
}

export default function ProjectTeamCard({ teamSize }: ProjectTeamCardProps) {
  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  i <= teamSize ? "bg-primary" : "bg-muted-foreground/15",
                )}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
            Team
          </span>
        </div>
        <span className="text-xs text-muted-foreground/45">
          {teamSize} member{teamSize === 1 ? "" : "s"}
        </span>
      </div>

      <div className="py-10 text-center border border-dashed border-border/20 rounded-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/7 mb-4">
          <span className="text-xl font-bold text-primary">1</span>
        </div>
        <p className="text-sm font-medium text-foreground">Just you</p>
        <p className="mt-1.5 text-xs text-muted-foreground/55">
          Invite team members to collaborate on this project.
        </p>
      </div>
    </div>
  )
}
