"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight,
  MessageSquare
} from 'lucide-react'

const IngestVisual = () => {
  return (
    <div className="relative flex h-full min-h-60 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/80">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border">
        <Upload className="h-8 w-8 text-primary" />
      </div>
      <h4 className="text-lg font-semibold text-foreground">Drop PRD here</h4>
      <p className="mt-2 text-sm text-muted-foreground">
        Support for .pdf, .docx, and .md
      </p>
      <div className="mt-6 flex gap-3 opacity-60">
        <div className="flex items-center gap-1 rounded bg-background px-2 py-1 text-xs ring-1 ring-border">
          <FileText className="h-3 w-3" /> PDF
        </div>
        <div className="flex items-center gap-1 rounded bg-background px-2 py-1 text-xs ring-1 ring-border">
          <FileText className="h-3 w-3" /> DOCX
        </div>
      </div>
    </div>
  )
}

const RefineVisual = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-amber-500">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Gap Detected</span>
        </div>
        <p className="text-sm font-medium text-foreground">Missing Error Handling</p>
        <p className="mt-1 text-xs text-muted-foreground">
          What should happen if the payment gateway times out?
        </p>
      </div>

      <div className="ml-4 flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 rounded-full bg-primary/10 p-1">
            <MessageSquare className="h-3 w-3 text-primary" />
          </div>
          <div className="rounded-lg rounded-tl-none bg-muted px-3 py-2 text-xs text-foreground">
            <span className="font-medium text-primary">AI:</span> Should we retry or fail immediately?
          </div>
        </div>
        <div className="flex items-start gap-2 flex-row-reverse">
          <div className="rounded-lg rounded-tr-none bg-primary px-3 py-2 text-xs text-primary-foreground">
            Retry 3 times, then show error toast.
          </div>
        </div>
      </div>
    </div>
  )
}

const ExecuteVisual = () => {
  return (
    <div className="flex h-full w-full flex-col p-2">
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <span className="text-sm font-semibold text-foreground">Engineering Roadmap</span>
        <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
          <RefreshCw className="h-3 w-3" /> Synced
        </span>
      </div>
      
      <div className="space-y-3">
        {[
          { name: 'Database Schema', progress: '100%', color: 'bg-green-500' },
          { name: 'Auth API', progress: '60%', color: 'bg-blue-500' },
          { name: 'Frontend Integration', progress: '20%', color: 'bg-amber-500' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="text-muted-foreground">{item.progress}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={`h-full rounded-full ${item.color}`} 
                style={{ width: item.progress }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 pt-4 opacity-75">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-[#5E6AD2] text-[10px] font-bold text-white">L</div>
        <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0052CC] text-[10px] font-bold text-white">J</div>
        <span className="text-xs text-muted-foreground">Integrations active</span>
      </div>
    </div>
  )
}

const WorkflowStep = ({ 
  number, 
  title, 
  description, 
  visual,
  isActive, 
  onClick 
}: { 
  number: string, 
  title: string, 
  description: string, 
  visual: React.ReactNode,
  isActive: boolean,
  onClick: () => void
}) => {
  return (
    <div 
      className={cn(
        "group relative grid cursor-pointer gap-6 overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:bg-accent/50 md:grid-cols-2 md:gap-10 md:p-8",
        isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border/50"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col justify-center">
        <div className="mb-4 text-sm font-bold text-primary">
          STEP {number}
        </div>
        <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
        <div className={cn(
          "mt-6 flex items-center text-sm font-medium text-primary transition-opacity",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
      
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted/30 p-4 md:aspect-auto md:min-h-[250px]">
        {visual}
      </div>
    </div>
  )
}

const HowItWork = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Ingest",
      description: "Upload your existing documents (PRDs, RFCs, or raw notes). Archon instantly parses and structures your requirements.",
      visual: <IngestVisual />
    },
    {
      title: "Refine",
      description: "Our AI agent identifies gaps and edge cases. Answer simple clarifying questions to solidify the spec before coding starts.",
      visual: <RefineVisual />
    },
    {
      title: "Execute",
      description: "Generate a fully broken-down roadmap. Sync tasks directly to Linear or Jira and track implementation progress.",
      visual: <ExecuteVisual />
    }
  ]

  return (
    <section id="how-it-works" className="relative w-full bg-background px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            How Archon Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From raw idea to executable plan in minutes.
          </p>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <WorkflowStep
              key={index}
              number={`0${index + 1}`}
              title={step.title}
              description={step.description}
              visual={step.visual}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWork