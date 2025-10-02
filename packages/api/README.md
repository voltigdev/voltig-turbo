# @repo/api

Type-safe API definitions using tRPC for Voltig Turbo.

## Overview

This package contains all tRPC routers, procedures, and API type definitions shared across the Voltig Turbo monorepo.

## Features

- **tRPC 11** routers and procedures
- **Type-safe** API contracts
- **Zod validation** for inputs
- **Reusable procedures** (public, protected)
- **Shared** across server and clients

## Usage

### In Server (Fastify)

```typescript
import { appRouter, createContext } from '@repo/api';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
  },
});
```

### In Web Client

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api';

export const api = createTRPCReact<AppRouter>();

// In component
const { data } = api.todo.list.useQuery();
```

### In Mobile Client

```typescript
import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '@repo/api';

const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:4000/trpc',
});

const todos = await client.todo.list.query();
```

## Structure

```
api/
├── src/
│   ├── root.ts          # Main app router
│   ├── trpc.ts          # tRPC setup and procedures
│   ├── context.ts       # Context creation
│   └── router/
│       ├── todo.ts      # Example todo router
│       └── ...          # Additional routers
└── package.json
```

## Adding New Routers

1. Create router file in `src/router/`:

```typescript
// src/router/rewards.ts
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const rewardsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.rewards.findMany();
  }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      points: z.number().int().positive(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(rewards).values({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});
```

2. Merge in `src/root.ts`:

```typescript
import { rewardsRouter } from './router/rewards';

export const appRouter = router({
  todo: todoRouter,
  rewards: rewardsRouter, // Add here
});
```

3. Types are automatically available!

## Procedures

### Public Procedure

Accessible without authentication:

```typescript
const publicData = publicProcedure.query(async ({ ctx }) => {
  return ctx.db.query.publicData.findMany();
});
```

### Protected Procedure

Requires authentication:

```typescript
const userData = protectedProcedure.query(async ({ ctx }) => {
  // ctx.session is guaranteed to exist
  return ctx.db.query.user.findFirst({
    where: eq(user.id, ctx.session.user.id),
  });
});
```

## Context

Context provides:
- `db`: Drizzle database client
- `session`: User session (if authenticated)
- `req`: Request object
- `res`: Response object

## Related

- [Server](../../apps/server/README.md)
- [Database](../db/README.md)
- [Auth](../auth/README.md)
