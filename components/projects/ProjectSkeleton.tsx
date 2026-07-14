"use client"

export default function ProjectSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/20 bg-card/20 px-5 py-4.5 animate-pulse"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4].map((d) => (
                    <div key={d} className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/10" />
                      {d < 4 && <div className="mx-0.5 h-px w-2 bg-muted-foreground/10" />}
                    </div>
                  ))}
                </div>
                <div className="h-4 w-44 rounded bg-muted-foreground/10" />
                <div className="h-3 w-12 rounded bg-muted-foreground/10" />
              </div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((l) => (
                  <div key={l} className="h-3 w-16 rounded bg-muted-foreground/10" />
                ))}
              </div>
            </div>
            <div className="h-7 w-24 rounded-xl bg-muted-foreground/10" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-0.5 flex-1 rounded-full bg-muted-foreground/10" />
            <div className="h-3 w-8 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
