import React from 'react'
import SpotlightCard from '../SpotlightCard'

const Problems = () => {
  const problems = [
    {
      title: "The Gap",
      description: "PRDs are often missing critical technical edge cases.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-white/60">
          <path d="M19.07 4.93L17 7l-2.12-2.12a.996.996 0 0 0-1.41 0l-2.12 2.12L9.24 4.93a.996.996 0 0 0-1.41 0L5.7 7.05 3.59 4.93a1 1 0 0 0-1.41 1.41l2.12 2.12-2.12 2.12a1 1 0 0 0 1.41 1.41l2.12-2.12 2.12 2.12a1 1 0 0 0 1.41 0l2.12-2.12 2.12 2.12a1 1 0 0 0 1.41 0l2.12-2.12 2.12 2.12a1 1 0 0 0 1.41-1.41l-2.12-2.12 2.12-2.12a1 1 0 0 0 0-1.41z"/>
        </svg>
      )
    },
    {
      title: "The Manual Tax",
      description: "Senior devs spend 20+ hours a month just breaking down tasks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-white/60">
          <path d="M12 2v20"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      title: "The Drift",
      description: "Requirements change, and your roadmap becomes obsolete.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-white/60">
          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/>
          <circle cx="17" cy="7" r="5"/>
        </svg>
      )
    }
  ]

  return (
    <section id="problems" className="relative w-full bg-black scroll-mt-24 pt-4 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Engineering is hard. <span className="text-white/60">Planning should&apos;t be.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
            Traditional project planning is broken.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <SpotlightCard 
              key={index} 
              className="flex flex-col items-start p-8 h-full min-h-72 bg-neutral-900/50 border-neutral-800"
              spotlightColor="rgba(255, 255, 255, 0.15)"
            >
              {problem.icon}
              <h3 className="mb-2 text-xl font-semibold text-white">
                {problem.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base text-pretty line-clamp-3 sm:line-clamp-4">
                {problem.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problems
