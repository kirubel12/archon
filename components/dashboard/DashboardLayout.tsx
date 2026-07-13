import Sidebar from "./Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-dvh grid-cols-[220px_1fr] bg-background">
      <Sidebar />
      <main className="overflow-y-auto border-l border-border/50">
        <div className="mx-auto max-w-6xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
