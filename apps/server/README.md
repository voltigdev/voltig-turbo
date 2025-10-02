# API Server - Voltig Turbo

High-performance API server built with Fastify, tRPC, and PostgreSQL.

## Overview

The Voltig Turbo API server provides a type-safe backend using tRPC, with Fastify for routing, Better Auth for authentication, and Drizzle ORM for database access.

### Key Features

- **Fastify 5**: High-performance web server
- **tRPC 11**: End-to-end type-safe API
- **Better Auth**: Authentication and authorization
- **PostgreSQL + Drizzle**: Type-safe database access
- **Security**: Helmet security headers, CORS, rate limiting
- **Logging**: Structured logging with Pino
- **Docker**: PostgreSQL database via Docker Compose

## Tech Stack

- **Fastify** 5.6.0
- **tRPC** 11.4.0
- **TypeScript** 5.9
- **PostgreSQL** 17 (Docker)
- **Drizzle ORM** (via @repo/db)
- **Better Auth** (via @repo/auth)
- **Pino** (logging)

## Quick Start

### Prerequisites

- Node.js >= 22.20.0
- pnpm >= 10.17.1
- Docker (for PostgreSQL)

### Installation

```bash
# From monorepo root
cd apps/server

# Environment is loaded from root .env.development
```

### Development

```bash
# Start server (automatically starts Docker database)
pnpm dev

# Or from monorepo root
pnpm -F server dev
```

Server runs at `http://localhost:4000`

### Database Management

```bash
# Start PostgreSQL database
pnpm db:up

# Stop database
pnpm db:down

# View database logs
pnpm db:logs

# Restart database
pnpm db:restart
```

## Project Structure

```
server/
├── src/
│   ├── server.ts        # Server entry point
│   ├── context.ts       # tRPC context
│   ├── router.ts        # Main tRPC router
│   └── env.ts           # Environment validation
├── docker-compose.yml   # PostgreSQL database
├── tsup.config.ts       # Build configuration
└── package.json
```

## Environment Variables

Create `.env.development` in monorepo root:

```bash
# Server
NODE_ENV=development
PORT=4000
BASE_URL=http://localhost:4000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/voltig

# Auth (for production)
AUTH_SECRET=your_secret_here
BETTER_AUTH_SECRET=your_secret_here
AUTH_RESEND_API_KEY=your_resend_api_key
```

## API Routes

### tRPC Endpoints

All tRPC procedures are accessible at `/trpc/*`

Example procedures (from @repo/api):

```typescript
// Query example
const todos = await trpc.todo.list.query();

// Mutation example
const newTodo = await trpc.todo.create.mutate({
  title: 'New Todo',
  description: 'Description',
});
```

### Health Check

```bash
GET /health
```

Returns server health status.

## tRPC Configuration

### Context

The tRPC context provides:
- Request and reply objects (Fastify)
- User session (Better Auth)
- Database client (Drizzle)

```typescript
// src/context.ts
export const createContext = async ({ req, res }) => {
  return {
    req,
    res,
    db,
    session: await getSession(req),
  };
};
```

### Adding New Procedures

1. Define procedure in `packages/api/src/router/`
2. Merge router in `packages/api/src/root.ts`
3. Types are automatically available to clients

Example:

```typescript
// packages/api/src/router/example.ts
import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const exampleRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.example.findMany();
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(example).values(input);
    }),
});
```

## Authentication

### Better Auth Setup

Authentication is handled by Better Auth via `@repo/auth`:

```typescript
import { auth } from '@repo/auth';

// Get session
const session = await auth.api.getSession({ headers: req.headers });

// Protected routes
if (!session) {
  throw new Error('Unauthorized');
}
```

### Protected Procedures

Use `protectedProcedure` for authenticated endpoints:

```typescript
export const userRouter = router({
  profile: protectedProcedure.query(async ({ ctx }) => {
    // ctx.session is guaranteed to exist
    return ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });
  }),
});
```

## Security

### Helmet

Security headers are automatically applied:

```typescript
await server.register(helmet, {
  contentSecurityPolicy: false, // Adjust as needed
});
```

### CORS

CORS is configured for trusted origins:

```typescript
await server.register(cors, {
  origin: [
    'http://localhost:3000', // Landing
    'http://localhost:3001', // App
    'http://localhost:3002', // Admin
  ],
  credentials: true,
});
```

### Rate Limiting

API routes are rate-limited:

```typescript
await server.register(rateLimit, {
  max: 100,
  timeWindow: '15 minutes',
});
```

## Database

### Accessing Database

Database client is available via tRPC context:

```typescript
export const todoRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todo.findMany();
  }),
});
```

### Running Migrations

```bash
# From monorepo root
pnpm db:migrate:development
```

### Viewing Database

```bash
# Open Drizzle Studio
pnpm db:studio:development
```

## Logging

The server uses Pino for structured logging:

```typescript
server.log.info('Server started');
server.log.error({ err }, 'Error occurred');
```

### Development

Pretty-printed logs in development via `pino-pretty`.

### Production

JSON logs for production log aggregation.

## Building for Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Build Output

Built files are output to `dist/`:
- `dist/server.js` - Main server bundle
- Source maps included for debugging

## Docker Database

### Configuration

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: voltig
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Data Persistence

Database data is persisted in Docker volume `postgres_data`.

To reset database:

```bash
pnpm db:down
docker volume rm server_postgres_data
pnpm db:up
pnpm db:migrate:development
```

## Error Handling

tRPC provides automatic error handling:

```typescript
import { TRPCError } from '@trpc/server';

export const exampleRouter = router({
  example: protectedProcedure.query(async ({ ctx }) => {
    const data = await fetchData();

    if (!data) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Data not found',
      });
    }

    return data;
  }),
});
```

Error codes:
- `BAD_REQUEST` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `INTERNAL_SERVER_ERROR` (500)

## Testing

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format
```

## Scripts

```bash
# Development
pnpm dev          # Start dev server with watch mode
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:up        # Start PostgreSQL
pnpm db:down      # Stop PostgreSQL
pnpm db:logs      # View database logs
pnpm db:restart   # Restart database

# Code Quality
pnpm typecheck    # Type check
pnpm lint         # Lint code
pnpm format       # Format code

# Utilities
pnpm clean        # Clean build artifacts
```

## Deployment

### Environment Variables

Ensure production environment variables are set:

```bash
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://user:pass@host:5432/voltig
AUTH_SECRET=strong_random_secret
BETTER_AUTH_SECRET=strong_random_secret
AUTH_RESEND_API_KEY=your_resend_api_key
BETTER_AUTH_URL=https://api.yourdomain.com
```

### Docker Deployment

```dockerfile
FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build
COPY . .
RUN pnpm build

# Production
FROM node:22-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 4000
CMD ["node", "dist/server.js"]
```

### Health Checks

Configure health check endpoint:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
  interval: 30s
  timeout: 3s
  retries: 3
```

## Monitoring

### Logs

Access structured logs:

```bash
# Development
pnpm dev

# Production (JSON logs)
pnpm start | pino-pretty
```

### Metrics

Consider adding:
- Prometheus metrics
- APM tools (DataDog, New Relic)
- Error tracking (Sentry)

## Common Issues

### Database Connection

If database connection fails:

```bash
# Check database is running
pnpm db:logs

# Restart database
pnpm db:restart

# Verify DATABASE_URL in .env.development
```

### Port Already in Use

Change port in `.env.development`:

```bash
PORT=4001
```

### Type Errors

Regenerate types:

```bash
# From monorepo root
pnpm db:generate:development
pnpm typecheck
```

## Related Documentation

- [Fastify Documentation](https://fastify.dev)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Better Auth Docs](https://betterauth.com)
- [API Package](../../packages/api/README.md)
- [Database Package](../../packages/db/README.md)
- [Auth Package](../../packages/auth/README.md)

---

**Voltig Turbo API Server** - Built with Fastify and tRPC
