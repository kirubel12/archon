"use client"

import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts"

const progressConfig = {
  value: { label: "Progress", color: "oklch(0.585 0.233 277.117)" },
}

const docConfig = {
  count: { label: "Documents", color: "oklch(0.585 0.233 277.117)" },
}

const activityConfig = {
  events: { label: "Events", color: "oklch(0.585 0.233 277.117)" },
}

interface ChartCardProps {
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

function ChartCard({ title, subtitle, className, children }: ChartCardProps) {
  return (
    <div className={`rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${className || ""}`}>
      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground/55">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

interface ProjectAnalyticsProps {
  progressHistory: { date: string; value: number }[]
  documentHistory: { date: string; count: number }[]
  activityTrend: { date: string; events: number }[]
}

export default function ProjectAnalytics({
  progressHistory,
  documentHistory,
  activityTrend,
}: ProjectAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ChartCard title="Progress Over Time" subtitle="Overall completion trend">
        <ChartContainer config={progressConfig} className="h-48 aspect-auto">
          <LineChart data={progressHistory} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.55)" }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.55)" }}
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
            />
            <ChartTooltip
              contentStyle={{ background: "oklch(0.12 0.005 286)", border: "1px solid oklch(0.25 0.01 286)", borderRadius: "var(--radius)", fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              itemStyle={{ color: "oklch(0.85 0.01 286)" }}
              labelStyle={{ color: "oklch(0.6 0.01 286)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0, fill: "var(--color-value)" }}
            />
          </LineChart>
        </ChartContainer>
      </ChartCard>

      <ChartCard title="Documents Generated" subtitle="Cumulative document output">
        <ChartContainer config={docConfig} className="h-48 aspect-auto">
          <AreaChart data={documentHistory} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.55)" }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.55)" }}
              allowDecimals={false}
            />
            <ChartTooltip
              contentStyle={{ background: "oklch(0.12 0.005 286)", border: "1px solid oklch(0.25 0.01 286)", borderRadius: "var(--radius)", fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              itemStyle={{ color: "oklch(0.85 0.01 286)" }}
              labelStyle={{ color: "oklch(0.6 0.01 286)" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--color-count)"
              strokeWidth={1.5}
              fill="var(--color-count)"
              fillOpacity={0.06}
            />
          </AreaChart>
        </ChartContainer>
      </ChartCard>

      <ChartCard title="Activity Trend" subtitle="Events per day" className="md:col-span-2">
        <ChartContainer config={activityConfig} className="h-40 aspect-auto">
          <AreaChart data={activityTrend} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.45)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "oklch(0.6 0.01 286 / 0.55)" }}
              allowDecimals={false}
            />
            <ChartTooltip
              contentStyle={{ background: "oklch(0.12 0.005 286)", border: "1px solid oklch(0.25 0.01 286)", borderRadius: "var(--radius)", fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              itemStyle={{ color: "oklch(0.85 0.01 286)" }}
              labelStyle={{ color: "oklch(0.6 0.01 286)" }}
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="var(--color-events)"
              strokeWidth={1.5}
              fill="var(--color-events)"
              fillOpacity={0.06}
            />
          </AreaChart>
        </ChartContainer>
      </ChartCard>
    </div>
  )
}
