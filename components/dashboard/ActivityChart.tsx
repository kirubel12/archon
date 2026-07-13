"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { ChartDataPoint } from "@/lib/dashboard/types"

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border/50 bg-card px-3.5 py-2.5 shadow-sm backdrop-blur-xl">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">
        {payload[0].value} {payload[0].value === 1 ? "project" : "projects"}
      </p>
    </div>
  )
}

export default function ActivityChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/60 p-6 transition-colors duration-200 hover:bg-card/80">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground">Activity</h3>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground">
          Projects created this week
        </p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                <stop offset="60%" stopColor="var(--color-primary)" stopOpacity={0.06} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-muted-foreground)", fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--color-muted-foreground)", fontWeight: 500 }}
              dx={-4}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="projects"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#primaryGradient)"
              animationDuration={800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
