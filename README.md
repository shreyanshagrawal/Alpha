# HubX Admin Dashboard

A modern, responsive, and highly optimized SaaS Admin Dashboard built to satisfy advanced frontend engineering requirements.

## Overview

This project is a high-performance React application built with Next.js. It features a complete product management interface with real-time simulated updates, advanced column customization, URL state synchronization, and strict adherence to industry-standard Feature-Based Architecture.

## Tech Stack

- **Framework**: Next.js 16 (App Router) / React 19
- **Styling**: Tailwind CSS
- **Data Fetching & Caching**: TanStack Query (React Query)
- **Table Management**: TanStack Table (React Table v8)
- **State Management**: Zustand (for Toast Notifications) & URL SearchParams (for Filters)
- **Icons**: Lucide React
- **UI Components**: Shadcn UI / Radix Primitives

## Architecture & Folder Structure

The application strictly follows a **Feature-Based Architecture** to ensure massive scalability and modularity. Instead of grouping files by their type (e.g., all hooks together), files are grouped by their domain feature:

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
├── components/           # Global shared UI components (Shadcn, Layout wrappers)
├── features/             # Domain-specific modules
│   ├── products/         # Product Management Feature
│   │   ├── components/   # (Table, Filters, Search, Carousel)
│   │   ├── hooks/        # (useProducts, useMockWebsocket, useProductFilters)
│   │   ├── services/     # (API endpoints)
│   │   └── types/        # (TypeScript interfaces)
│   └── analytics/        # Analytics Feature
├── hooks/                # Global hooks (useUrlState, useToastStore)
└── lib/                  # Utilities
```

This structure guarantees that as the application grows, components and logic remain tightly coupled to their specific business domains.

## Data Fetching & Querying

Data fetching is handled exclusively via **TanStack Query**.
- **Source**: `https://dummyjson.com/products`
- **Polling**: The application utilizes TanStack Query's `refetchInterval` to silently poll the API every 10 seconds, ensuring baseline data remains fresh.
- **Caching**: Product data is cached globally. Navigating between the Product List and Product Detail pages utilizes this cache for instant rendering without redundant network requests.

## Routing & URL State Synchronization

The application uses the Next.js App Router for navigation:
- `/dashboard`: Main entry point
- `/products`: Product Listing Module
- `/products/[id]`: Dynamic Product Detail Page
- `/analytics`: Analytics Overview

**URL State Synchronization**: 
All filters, sorting, and search parameters on the Products page are bidirectionally synced with the URL using a custom `useUrlState` hook. 
Example: `http://localhost:3000/products?category=beauty&rating=4&sort=price-asc`
This ensures that the exact state of the table can be bookmarked, shared, and preserved across page reloads.

## Key Features Implemented

1. **Dashboard Layout**: Fully responsive sidebar/topbar layout. The sidebar collapses into a mobile-friendly slide-out Sheet on smaller screens.
2. **Product Listing**: 
   - Real-time search functionality.
   - Multi-category and minimum-rating filtering.
   - Bidirectional sorting (Price, Title, Rating, Stock).
3. **Column Customization**: Users can toggle column visibility and visually reorder columns by dragging/clicking arrows in the header.
4. **Product Detail Page**: Displays a sleek UI with an interactive image carousel (Embla Carousel) and detailed product metrics.
5. **Real-Time WebSocket Mocking**: A background engine (`useMockWebsocket`) simulates asynchronous server-push events by directly patching the TanStack Query cache. It randomly fluctuates prices and stock levels every 12 seconds, triggering Framer Motion animated Toast alerts instantly.

## Performance Optimizations

The application implements strict performance optimizations to prevent unnecessary re-renders:
1. **Debounced Search**: A custom `useDebounce` hook limits search filtering to every 300ms.
2. **React.memo**: Expensive filter and search components are wrapped in `memo` to prevent re-rendering when the main table data changes.
3. **useMemo**: Heavily utilized to cache derived state (`filteredProducts`, `categories`, `sorting`), preventing recalculations on every render cycle.
4. **useCallback**: All state mutator functions passed down to child components are memoized to maintain stable references.
5. **Suspense boundaries**: The main page content is wrapped in `<Suspense>` to allow Next.js to statically pre-render the shell while dynamically evaluating the URL search parameters on the client.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dashboard.
