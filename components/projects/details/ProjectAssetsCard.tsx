"use client"

import type { ProjectAsset } from "@/lib/dashboard/types"
import { cn, pluralize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FileText,
  PenTool,
  Cpu,
  Server,
  Download,
  Paperclip,
  FolderOpen,
  ArrowUpRight,
} from "lucide-react"

const assetIcons: Record<string, React.ReactNode> = {
  prd: <FileText className="h-4 w-4" strokeWidth={1.8} />,
  design: <PenTool className="h-4 w-4" strokeWidth={1.8} />,
  workflow: <Cpu className="h-4 w-4" strokeWidth={1.8} />,
  spec: <Server className="h-4 w-4" strokeWidth={1.8} />,
  export: <Download className="h-4 w-4" strokeWidth={1.8} />,
  attachment: <Paperclip className="h-4 w-4" strokeWidth={1.8} />,
}

const assetColors: Record<string, string> = {
  prd: "text-primary bg-primary/12",
  design: "text-amber-500 bg-amber-500/12",
  workflow: "text-emerald-500 bg-emerald-500/12",
  spec: "text-cyan-500 bg-cyan-500/12",
  export: "text-violet-500 bg-violet-500/12",
  attachment: "text-muted-foreground/55 bg-muted-foreground/12",
}

const statusColors: Record<string, string> = {
  completed: "bg-emerald-500/12 text-emerald-500",
  draft: "bg-amber-500/12 text-amber-500",
  generated: "bg-primary/12 text-primary",
}

interface ProjectAssetsCardProps {
  assets: ProjectAsset[]
}

export default function ProjectAssetsCard({ assets }: ProjectAssetsCardProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-7">
          <span className="inline-flex rounded-lg bg-muted-foreground/10 p-1.5">
            <FolderOpen className="h-4 w-4 text-muted-foreground/55" strokeWidth={1.8} />
          </span>
          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
            Assets
          </span>
        </div>
        <div className="py-10 text-center">
          <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground/25" strokeWidth={1.5} />
          <p className="mt-4 text-sm text-muted-foreground/55">No assets generated yet</p>
          <p className="mt-1.5 text-xs text-muted-foreground/45">
            Assets appear as PRDs and documents are created.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border/25 bg-gradient-to-br from-card/55 to-card/40 p-6 transition-all duration-300 hover:border-border/45 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2.5 mb-7">
        <span className="inline-flex rounded-lg bg-muted-foreground/10 p-1.5">
          <FolderOpen className="h-4 w-4 text-muted-foreground/55" strokeWidth={1.8} />
        </span>
        <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
          Assets
        </span>
        <span className="text-xs font-medium text-muted-foreground/45 ml-auto">
          {pluralize(assets.length, "file")}
        </span>
      </div>

      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center gap-3 rounded-lg px-3.5 py-3 transition-all duration-200 hover:bg-card/55"
          >
            <span className={cn("inline-flex rounded-lg p-2 shrink-0", assetColors[asset.type])}>
              {assetIcons[asset.type]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate" title={asset.name}>
                {asset.name}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={cn(
                    "rounded-lg px-2 py-0.5 text-xs font-medium",
                    statusColors[asset.status],
                  )}
                >
                  {asset.status}
                </span>
                {asset.size && (
                  <span className="text-xs text-muted-foreground/45">{asset.size}</span>
                )}
              </div>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/45" strokeWidth={1.8} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
