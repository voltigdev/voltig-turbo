# @repo/auth

Better Auth configuration for Voltig Turbo.

## Overview

Centralized authentication configuration using Better Auth with support for web and mobile platforms.

## Features

- **Email/Password** authentication
- **Email verification** required
- **Session management** (7-day expiry)
- **Multi-role** support (admin, merchant, customer)
- **Cross-platform** (web + mobile)
- **OAuth proxy** for mobile flows
- **Drizzle adapter** for PostgreSQL

## Configuration

```typescript
// auth.ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'customer',
      },
    },
  },
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'exp://192.168.1.1:8081', // Expo dev
  ],
});
```

## Usage

### Server-Side

```typescript
import { auth } from '@repo/auth';

// Get session
const session = await auth.api.getSession({
  headers: request.headers,
});

if (!session) {
  throw new Error('Unauthorized');
}
```

### Web Client

```typescript
import { auth } from '@repo/auth/client';

// Sign in
await auth.signIn.email({
  email: 'user@example.com',
  password: 'password123',
});

// Get session
const session = await auth.getSession();

// Sign out
await auth.signOut();
```

### Mobile Client

```typescript
import { auth } from '@repo/auth/mobile';

// Sign in
await auth.signIn.email({
  email: 'user@example.com',
  password: 'password123',
});
```

## Database Schema

Better Auth requires these tables (auto-generated):
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

Generate schema:

```bash
pnpm auth:generate:development
```

## User Roles

Default roles:
- `customer` - Regular users
- `merchant` - Business owners
- `admin` - Administrators

Check role:

```typescript
if (session.user.role === 'admin') {
  // Admin-only logic
}
```

## Related

- [Better Auth Docs](https://betterauth.com)
- [Database](../db/README.md)
- [API](../api/README.md)
