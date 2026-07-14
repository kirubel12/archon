"use client"

interface ProjectProgressProps {
  completed: number
  total: number
  percentage: number
}

export default function ProjectProgress({ completed, total, percentage }: ProjectProgressProps) {
  const isComplete = percentage === 100

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-muted/30">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/70">
        {completed}/{total}
      </span>
    </div>
  )
}
