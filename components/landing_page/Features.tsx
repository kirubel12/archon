"use client"

import React from "react"
import { cn } from "@/lib/utils"

type Feature = {
  id: string
  title: string
  eyebrow: string
  description: string
  points: string[]
}

interface FeatureCardProps {
  feature: Feature
}

const FEATURES: Feature[] = [
  {
    id: "alignment",
    title: "Requirements alignment",
    eyebrow: "From idea to spec",
    description:
      "Capture just enough structure so every engineer and stakeholder sees the same plan.",
    points: [
      "Summarize context in a few focused prompts",
      "Highlight risks, edge cases, and assumptions",
      "Produce specs that map cleanly to tickets"
    ]
  },
  {
    id: "breakdown",
    title: "Confident task breakdown",
    eyebrow: "Built for shipping",
    description:
      "Turn high-level goals into small, independently shippable slices without losing the big picture.",
    points: [
      "Group work by milestones and outcomes",
      "Sequence dependencies to avoid bottlenecks",
      "Keep scope flexible while dates stay realistic"
    ]
  },
  {
    id: "visibility",
    title: "Live delivery visibility",
    eyebrow: "Always up to date",
    description:
      "See how scope, risk, and effort move together as the roadmap evolves over time.",
    points: [
      "Surface what changed between versions",
      "Understand tradeoffs in plain language",
      "Share snapshots with product and leadership"
    ]
  },
  {
    id: "handoff",
    title: "Frictionless handoff",
    eyebrow: "Ready for tools",
    description:
      "Hand engineers a roadmap that already matches the way the codebase and tools are structured.",
    points: [
      "Use a consistent structure release to release",
      "Mirror the language your team already uses",
      "Make every PR traceable back to the plan"
    ]
  }
]

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ feature }) => {
  const titleId = `${feature.id}-title`
  const descId = `${feature.id}-description`

  return (
    <article
      className={cn(
        "group flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur",
        "transition-transform duration-300 ease-out hover:-translate-y-1 hover:bg-card hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-ring/70"
      )}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div>
        <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {feature.eyebrow}
        </p>
        <h3
          id={titleId}
          className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          {feature.title}
        </h3>
        <p
          id={descId}
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
        >
          {feature.description}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {feature.points.map(point => (
            <li key={point} className="flex items-start gap-2">
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground/80">
          Designed for product & engineering
        </span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] text-primary">
          Built-in clarity
        </span>
      </div>
    </article>
  )
})

FeatureCard.displayName = "FeatureCard"

const Features: React.FC = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative w-full bg-background px-4 pb-20 pt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="features-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Product features
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            A focused set of capabilities that turn messy requirements into a
            roadmap your team can ship with confidence.
          </p>
        </header>

        <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2">
          {FEATURES.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features