# @repo/db

Database schemas and client using Drizzle ORM for Voltig Turbo.

## Overview

Centralized database configuration with Drizzle ORM, PostgreSQL, and type-safe query builder.

## Features

- **PostgreSQL 17** database
- **Drizzle ORM** v0.44.4
- **Type-safe** queries
- **Schema migrations**
- **Drizzle Studio** (database GUI)
- **Snake case** column naming

## Structure

```
db/
├── src/
│   ├── index.ts         # Database client export
│   ├── client.ts        # Drizzle client setup
│   └── schema/
│       ├── auth.ts      # Auth tables (generated)
│       └── app.ts       # Application tables
├── drizzle/             # Migrations
└── drizzle.config.ts    # Drizzle configuration
```

## Usage

```typescript
import { db } from '@repo/db';
import { todo } from '@repo/db/schema';
import { eq } from 'drizzle-orm';

// Query
const todos = await db.query.todo.findMany();

// Insert
await db.insert(todo).values({
  title: 'New todo',
  description: 'Description',
});

// Update
await db.update(todo)
  .set({ title: 'Updated' })
  .where(eq(todo.id, '123'));

// Delete
await db.delete(todo)
  .where(eq(todo.id, '123'));
```

## Schema Definition

```typescript
// src/schema/app.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  ownerId: text('owner_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

## Migrations

### Generate Migration

After schema changes:

```bash
pnpm db:generate:development
```

### Run Migrations

```bash
pnpm db:migrate:development
```

### Push Schema (Dev Only)

Skip migrations for rapid development:

```bash
pnpm db:push:development
```

## Drizzle Studio

Open database GUI:

```bash
pnpm db:studio:development
```

Visit `https://local.drizzle.studio`

## Environment

Development:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/voltig
```

Production:

```bash
DATABASE_URL=postgresql://user:pass@prod-host:5432/voltig
```

## Relations

```typescript
export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
});

export const todo = pgTable('todo', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => user.id),
  title: text('title').notNull(),
});

// Define relations
export const userRelations = relations(user, ({ many }) => ({
  todos: many(todo),
}));

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
}));
```

Query with relations:

```typescript
const userWithTodos = await db.query.user.findFirst({
  where: eq(user.id, '123'),
  with: {
    todos: true,
  },
});
```

## Scripts

From monorepo root:

```bash
# Generate schema
pnpm db:generate:development

# Run migrations
pnpm db:migrate:development

# Push schema (dev only)
pnpm db:push:development

# Open Drizzle Studio
pnpm db:studio:development
```

## Related

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [API Package](../api/README.md)
- [Server](../../apps/server/README.md)
