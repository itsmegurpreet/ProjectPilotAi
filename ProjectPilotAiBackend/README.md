# ProjectPilot AI Backend

Production-oriented backend for ProjectPilot AI.

## Stack

- Node.js + Express + TypeScript
- Prisma ORM + SQLite (`projectpilot.db`)
- JWT auth
- Multer uploads
- PDF/DOCX parsing (`pdf-parse`, `mammoth`)
- Pluggable AI providers (`mock`, `qwen`, `deepseek`, `openai`)

## Setup

1. Install dependencies:
   - `npm install`
2. Create env file:
   - `cp .env.example .env`
3. Run migration:
   - `npm run prisma:migrate`
4. Start dev server:
   - `npm run dev`

## Scripts

- `npm run dev` - start dev server with watch
- `npm run build` - compile TypeScript and rewrite alias paths
- `npm run start` - run compiled server
- `npm run prisma:migrate` - create/apply migrations
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:studio` - open Prisma Studio

## API Base

- `http://localhost:4000/api`

## Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### Users

- `GET /users/me`

### Projects

- `POST /projects`
- `GET /projects`
- `GET /projects/:id`
- `DELETE /projects/:id`

### Documents

- `POST /documents/:id/upload` (multipart field name: `file`)
- `GET /documents/:id`

### Analysis

- `POST /analysis/:id/analyze`
- `GET /analysis/:id`

### Dashboard

- `GET /dashboard/stats`

## Health

- `GET /health`

## Notes

- Use `Authorization: Bearer <accessToken>` for protected routes.
- For `AI_PROVIDER=mock`, analysis returns deterministic template-based data.
- Uploaded files are stored in `uploads/documents`.
