# Archon 🏛️ 
### The AI-Native Technical Architect for Engineering Teams

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![AI Engine](https://img.shields.io/badge/AI-Gemini%202.0%20/%20GPT--4o-blue?style=for-the-badge)](https://vercel.com/ai)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)

**Archon** is a production-grade AI agent that bridges the gap between high-level product ideation and low-level engineering execution. Built for the 2026 web ecosystem, it transforms Product Requirement Documents (PRDs) into granular, multi-phase technical roadmaps with automated gap analysis and ecosystem integration.

[**Live Demo**](https://archon-ai.vercel.app) | [**System Architecture**](#-system-architecture) | [**Video Walkthrough**](https://youtube.com/...)

---

## 🚀 Key Features

* **📄 Intelligent PRD Ingestion:** Supports `.pdf`, `.docx`, and `.md`. Uses multi-modal LLMs to extract core business logic and constraints.
* **🔍 Technical Gap Analysis:** Automatically identifies "missing requirements" (e.g., edge cases in auth flows, missing database relationships, or scaling bottlenecks).
* **📊 Dynamic Mermaid.js Visuals:** Live-renders Gantt charts, sequence diagrams, and flowcharts based on the AI-generated roadmap.
* **⚙️ Agentic Tool Use:** The agent can autonomously "search" for modern best practices or specific documentation to ensure the roadmap is technically sound.
* **🔗 Ecosystem Sync:** One-click export to **GitHub Issues**, **Jira**, or **Linear** to instantly populate a developer's workspace.
* **⚡ Edge-First Performance:** Optimized for global low-latency using Next.js 16 Edge Runtime.

---

## 🛠️ Tech Stack (2026 Standards)

| Layer | Technology |
| :--- | :--- |
| **Framework** | **Next.js 16** (App Router, Server Actions, React Compiler) |
| **AI Orchestration** | **Vercel AI SDK** + LangChain.js |
| **LLM Reasoning** | **Gemini 2.0 Flash** (Analysis) & **GPT-4o** (Decomposition) |
| **Vector Database** | **Supabase Vector** (PostgreSQL + `pgvector`) |
| **Styling & UI** | **Tailwind CSS**, **Shadcn/UI**, Framer Motion |
| **Visualization** | **Mermaid.js** (Standard for technical diagrams) |
| **Quality Assurance** | **Playwright** (E2E) & **Vitest** (Unit Testing) |

---

## 🏗️ System Architecture

Archon utilizes a **Recursive Multi-Agent Loop** to ensure the roadmap is accurate and actionable:

1.  **Ingestion & Embedding:** The PRD is parsed and converted into vector embeddings.
2.  **The Auditor Agent:** Queries the document to find inconsistencies or logical gaps, prompting the user for clarification.
3.  **The Architect Agent:** Decomposes the approved requirements into Phases, Modules, and Tasks using **Structured Output (JSON Mode)**.
4.  **The Visualizer Agent:** Converts the JSON roadmap into Mermaid.js syntax for real-time UI rendering.

---

## 🚦 Getting Started

### Prerequisites
* **Node.js** 22.x or higher
* **pnpm** (preferred package manager)
* **API Keys:** Google Gemini or OpenAI, Supabase, GitHub (for OAuth sync).

### Installation
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/kirubel12/archon.git](https://github.com/kirubel12/archon.git)
    cd archon
    ```
2.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
3.  **Configure Environment:**
    ```bash
    cp .env.example .env.local
    # Add your API keys to .env.local
    ```
4.  **Launch Development Server:**
    ```bash
    pnpm dev
    ```

---

## 🧠 Why This Project?

I built **Archon** to solve the "Blank Page" problem in engineering. Many projects fail not due to poor coding, but due to poor planning. Archon demonstrates my ability to build **AI-Agentic workflows**, handle **Complex State Management**, and implement **High-Performance UI** patterns that are expected of a Senior Web Developer in 2026.

---



## 🤝 Contact

**[Kirubel Habte](https://linkedin.com/in/kirubel_habte)** | [Twitter/X](https://x.com/kirubel_habte) | [Email](mailto:kirubelhabte1991@email.com)

---
*Built with ❤️ for the 2026 Web Ecosystem.*