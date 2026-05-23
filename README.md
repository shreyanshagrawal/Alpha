# HubX Admin Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Live-success?style=for-the-badge)](https://alpha-ten-tau.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive, and highly optimized SaaS Admin Dashboard built to satisfy advanced frontend engineering requirements, featuring real-time data simulation and advanced state management.

**🌍 Live Deployment:** [https://alpha-ten-tau.vercel.app/](https://alpha-ten-tau.vercel.app/)

---

## 📖 Overview

HubX Admin Dashboard is a high-performance React application designed to manage product data efficiently. Built with the Next.js App Router, it provides a comprehensive product management interface. The project goes beyond standard CRUD by implementing complex real-time simulated updates, deep URL state synchronization, and a highly customizable data table—all wrapped in a clean, modern UI.

## 🚀 Key Features

- **Advanced Data Table**: Interactive table with multi-column sorting, pagination, and dynamic filtering.
- **Column Customization & Drag-and-Drop**: Users can dynamically toggle column visibility and visually reorder them to suit their workflow.
- **Deep URL State Synchronization**: Every filter, search query, and sort order is perfectly mirrored in the URL (`?category=smartphones&sort=price-asc`). This means you can share a link with a colleague, and they will see the exact same filtered view.
- **Real-Time Data Simulation**: A background service mocks a WebSocket connection, injecting random price and stock fluctuations into the cache and notifying the user via animated toasts.
- **Optimized Performance**: Strict use of React memoization (`useMemo`, `useCallback`, `React.memo`), debounced search inputs, and TanStack Query caching ensures buttery-smooth 60fps performance without redundant network requests or re-renders.
- **Responsive Layout**: A sidebar/topbar architecture that gracefully collapses into a mobile-friendly slide-out drawer on smaller devices.

## 🛠 Tech Stack

We selected cutting-edge tools to ensure maximum performance and developer experience:

- **Framework**: Next.js 16 (App Router) / React 19
- **Styling**: Tailwind CSS v4 & Framer Motion (for micro-animations and toasts)
- **Data Management**: TanStack Query (React Query) for server state & caching
- **Table Core**: TanStack Table (React Table v8) for headless table logic
- **Global State**: Zustand (for lightweight, fast state like Toast notifications)
- **UI Components**: Shadcn UI & Radix Primitives for accessible, unstyled component building blocks
- **Icons**: Lucide React

## 🏗 Architecture (Feature-Based)

To ensure long-term maintainability and massive scalability, the codebase strictly adheres to a **Feature-Based Architecture**. Rather than grouping files by type (e.g., all hooks together), everything is organized by the business domain it belongs to:

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, global CSS)
├── components/           # Global shared UI components (Shadcn, generic Layouts)
├── constants/            # Application-wide constants
├── features/             # Domain-specific modules (The core of the app)
│   ├── products/         # 📦 Product Management Domain
│   │   ├── components/   # Feature-specific UI (Table, Filters, Carousel)
│   │   ├── hooks/        # Feature-specific logic (useProducts, useMockWebsocket)
│   │   ├── services/     # API endpoints and queries for products
│   │   └── types/        # TypeScript interfaces for the domain
│   └── analytics/        # 📊 Analytics Domain
├── hooks/                # Global generic hooks (e.g., useUrlState)
└── lib/                  # Utility functions (Tailwind merge, formatting)
```

This structure guarantees that as new features are added, they remain isolated and do not pollute the global namespace.

## 📡 Data Fetching & Caching Strategy

All external data fetching relies on **TanStack Query**, consuming data from `https://dummyjson.com/products`.

1. **Smart Caching**: Data fetched on the listing page is cached globally. When a user clicks to view a Product Detail page, the app immediately uses the cached data for zero-latency rendering while re-verifying in the background.
2. **Background Polling**: The application silently polls the API periodically (`refetchInterval`) to ensure the baseline data does not become stale.
3. **Optimistic Updates**: The WebSocket simulator directly patches the local cache, instantly reflecting stock/price drops on the UI without requiring a full refetch.

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hubx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

The UI is built with a focus on "Rich Aesthetics." We utilize a curated color palette, subtle glassmorphism effects, smooth transitions powered by Framer Motion, and modern typography to deliver a premium, "wow-factor" experience that doesn't sacrifice accessibility.
