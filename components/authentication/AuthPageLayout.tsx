import Link from "next/link"

interface AuthPageLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function AuthPageLayout({ title, description, children }: AuthPageLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 focus-ring rounded-lg outline-none p-2">
        <div className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Archon
        </div>
      </Link>
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
