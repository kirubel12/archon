import DarkVeil from "../DarkVeil"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center">
        <div className="absolute inset-0">
            <DarkVeil />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-medium">AI-Native Architect</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                From Vague PRDs to <br className="hidden md:block" /> Verified Roadmap.
            </h1>
            
            <p className="mb-10 max-w-2xl text-base text-gray-400 md:text-xl">
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