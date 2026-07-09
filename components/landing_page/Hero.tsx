"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import DarkVeil from "../DarkVeil"
import { Button } from "../ui/button"

const Hero = () => {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    (cb) => {
      window.addEventListener("themechange", cb)
      return () => window.removeEventListener("themechange", cb)
    },
    () => true,
    () => false
  )

  const isLight = mounted && resolvedTheme === "light"

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex flex-col items-center justify-center">
        {isLight ? (
          <div className="absolute inset-0 -z-0 bg-background" aria-hidden />
        ) : (
          <div className="absolute inset-0 opacity-100 transition-opacity duration-300">
            <DarkVeil />
          </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-sm text-foreground backdrop-blur-md transition-colors hover:bg-card/85">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-medium text-xs sm:text-sm">AI-Native Architect</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl bg-gradient-to-b from-black dark:from-white to-neutral-700 dark:to-neutral-400 bg-clip-text text-transparent leading-none">
                From Vague PRDs to <br className="hidden md:block" /> Verified Roadmap.
            </h1>
            
            <p className="mb-10 max-w-2xl text-base text-muted-foreground md:text-xl leading-relaxed text-pretty">
                Archon is the AI-native Technical Architect that audits your requirements for logic gaps and generates high-fidelity, multi-phase execution plans. Stop guessing your sprint velocity—automate your technical decomposition.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="default" >
                    Build Your First Roadmap
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Hero
