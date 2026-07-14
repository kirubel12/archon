"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import {
  LayoutDashboard,
  FolderKanban,
  Map,
  Settings,
  Zap,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Roadmaps", href: "/dashboard/roadmaps", icon: Map },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center justify-between px-6 pt-6 pb-8">
        <div className="flex items-center gap-2.5 min-w-0">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-primary"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Archon
          </span>
        </div>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground -mr-1"
          aria-label="Close sidebar"
        >
          <PanelLeftClose className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-3 pb-5">
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-semibold text-foreground">
              Upgrade to Pro
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Unlimited projects, AI roadmaps, and priority support.
          </p>
          <button className="mt-3 w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Upgrade
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4 px-1">
          <UserButton />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">Account</p>
            <p className="truncate text-xs text-muted-foreground">Free plan</p>
          </div>
          <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <LogOut className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </aside>
  )
}
