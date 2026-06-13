# ProjectPilot AI Frontend

Production-quality SaaS frontend for analyzing BRD/PRD/SRS documents and generating project planning artifacts.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn-style reusable UI components
- React Query
- React Hook Form + Zod
- Recharts
- Axios

## Key Pages

- Landing
- Login
- Register
- Dashboard
- Upload Project Document
- Analysis Results
- WBS View
- Sprint Planning View
- Timeline View
- Reports and Charts View
- Project History
- User Profile

## Architecture

- `src/app`: Next.js routes and route-group layouts
- `src/features`: feature-oriented UI modules
- `src/components`: shared UI, layout, and states
- `src/hooks`: React Query hooks per domain view
- `src/services`: API integration layer (mock/live switch)
- `src/lib`: axios client, query client, mock data, utilities
- `src/types`: domain model types

## Mock Data and API Layer

The app uses mock data by default for development.

- `src/lib/mock-data.ts`: static mock payloads
- `src/lib/api.ts`: delayed mock API functions
- `src/services/project.service.ts`: unified service layer

Set `NEXT_PUBLIC_USE_MOCK=false` to route through Axios endpoints instead of mock functions.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
