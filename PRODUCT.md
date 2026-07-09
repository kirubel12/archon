# Archon

## Product summary
AI-native Technical Architect for engineering teams that transforms Product Requirement Documents (PRDs) into granular, multi-phase technical roadmaps with automated gap analysis and ecosystem integration.

## Target users
Engineering teams, technical leads, and product managers who need to bridge the gap between high-level product ideation and low-level engineering execution.

## Core value proposition
- Intelligent PRD ingestion (PDF, DOCX, MD) with multi-modal LLM extraction
- Automated technical gap analysis identifying missing requirements
- Dynamic Mermaid.js visualizations (Gantt charts, sequence diagrams, flowcharts)
- Agentic tool use for searching modern best practices
- One-click export to GitHub Issues, Jira, or Linear
- Edge-first performance with Next.js 16 Edge Runtime

## Key features
1. **PRD Ingestion**: Multi-format document parsing with vector embeddings
2. **Gap Analysis**: Auditor agent queries documents for inconsistencies and logical gaps
3. **Roadmap Generation**: Architect agent decomposes requirements into Phases, Modules, and Tasks
4. **Visualization**: Visualizer agent converts JSON roadmaps to Mermaid.js syntax
5. **Ecosystem Sync**: Export to developer workspaces (GitHub, Jira, Linear)

## Platform
web

## Register
product

## Tech stack
- **Framework**: Next.js 16 (App Router, Server Actions, React Compiler)
- **AI Orchestration**: Vercel AI SDK + LangChain.js
- **LLM Reasoning**: Gemini 2.0 Flash (Analysis) & GPT-4o (Decomposition)
- **Vector Database**: Supabase Vector (PostgreSQL + pgvector)
- **Styling & UI**: Tailwind CSS, Shadcn/UI, Framer Motion
- **Authentication**: Clerk
- **Database**: Drizzle ORM with PostgreSQL
- **Visualization**: Mermaid.js

## Current state
- Landing page with Hero, Problems, Features, HowItWorks sections
- Authentication flow (login/register) with Clerk
- Dashboard page structure
- Dark/light theme with OKLCH color system
- Responsive design with mobile navigation
