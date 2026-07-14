"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { PanelLeft } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div
      className="grid h-dvh bg-background transition-[grid-template-columns] duration-200"
      style={{ gridTemplateColumns: sidebarOpen ? "220px 1fr" : "0px 1fr" }}
    >
      <div className="overflow-hidden">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
      </div>
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute left-3 top-3 z-50 rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
      )}
      <main className="overflow-y-auto border-l border-border/50">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
