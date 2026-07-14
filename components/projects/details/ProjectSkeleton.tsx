"use client"

export default function ProjectSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="rounded-2xl border border-border/20 bg-card/20 p-8">
        <div className="h-8 w-64 rounded bg-muted-foreground/10" />
        <div className="mt-3 h-4 w-96 rounded bg-muted-foreground/10" />
        <div className="mt-6 flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-20 rounded bg-muted-foreground/10" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-card/20 border border-border/10" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 h-64 rounded-xl bg-card/20 border border-border/10" />
        <div className="h-64 rounded-xl bg-card/20 border border-border/10" />
      </div>
    </div>
  )
}
