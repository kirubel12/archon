"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AuthPageLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    card: "w-full bg-transparent shadow-none border-none p-0",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "border-border bg-muted text-foreground hover:bg-primary/10 hover:border-primary/40 focus:ring-2 focus:ring-primary/20 focus-ring rounded-md transition-all duration-200",
    formFieldLabel: "text-foreground text-sm font-medium",
    formFieldHintText: "text-muted-foreground",
    formFieldErrorText: "text-destructive",
    formFieldInput:
      "bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus-ring rounded-md transition-colors duration-200",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus-ring rounded-md transition-all duration-200 shadow-lg hover:shadow-primary/25",
    footerActionText: "text-muted-foreground",
    footerActionLink:
      "text-primary hover:text-primary/80 focus:underline focus:underline-offset-2 focus-ring transition-all duration-200",
    dividerText: "text-muted-foreground",
    identityPreviewText: "text-foreground",
    identityPreviewEditButton:
      "text-primary hover:bg-primary/10 focus:bg-primary/10 focus-ring rounded-md transition-colors duration-200",
    alertText: "text-destructive",
  },
}

export default function AuthPageLayout({ title, description, children }: AuthPageLayoutProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground">
      {/* Architectural grid background — clipped to prevent perspective overflow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="size-full opacity-20" style={{
          backgroundImage: `
            linear-gradient(color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
          transformOrigin: "center top",
        }} />
      </div>

      {/* Animated accent line (decorative; hidden under reduced motion) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 motion-safe:block"
        style={{
          transform: `translateY(${mousePosition.y * 0.02}px)`,
        }}
      />

      <div className="relative z-10 flex w-full">
        {/* Left side - Brand context */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-start p-12 space-y-8">
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg outline-none p-3 w-fit">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-2xl font-bold text-foreground tracking-tight font-mono">Archon</span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-foreground tracking-tight font-mono">
              AI-Native Technical Architecture
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Transform PRDs into verified roadmaps with automated gap detection and architectural intelligence.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold font-mono">Verified Roadmaps</h3>
                <p className="text-muted-foreground text-sm mt-1">AI-generated architecture with automated validation</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold font-mono">Gap Analysis</h3>
                <p className="text-muted-foreground text-sm mt-1">Automated detection of architectural inconsistencies</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold font-mono">Enterprise Security</h3>
                <p className="text-muted-foreground text-sm mt-1">GDPR compliant with end-to-end encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-start justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            <div className="auth-glass rounded-2xl auth-glow px-5 py-6 sm:p-6 space-y-5 sm:space-y-6">
              {/* Mobile logo */}
              <Link href="/" className="lg:hidden flex items-center justify-center gap-2 focus-ring rounded-lg outline-none p-2 sm:p-3 mb-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-2xl font-bold text-foreground tracking-tight font-mono">Archon</span>
              </Link>

              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground tracking-tight font-mono">
                  {title}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
