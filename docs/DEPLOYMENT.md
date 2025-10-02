# Deployment Guide - Voltig Turbo

This guide covers deploying Voltig Turbo to production environments.

## Overview

Voltig Turbo consists of multiple deployable components:
- **API Server** (Fastify + tRPC)
- **Web Applications** (React + TanStack)
- **Mobile App** (React Native + Expo)
- **PostgreSQL Database**

## Prerequisites

- Production domain(s)
- SSL certificates
- PostgreSQL database (hosted)
- Email service (Resend, SendGrid, etc.)
- Expo account (for mobile)
- Analytics keys (PostHog, optional)

## Environment Variables

### Production Environment

Create `.env` in root:

```bash
# Environment
NODE_ENV=production

# API Server
PORT=4000
BASE_URL=https://api.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/voltig?sslmode=require

# Authentication
AUTH_SECRET=<generate-strong-random-string>
BETTER_AUTH_SECRET=<generate-strong-random-string>
BETTER_AUTH_URL=https://api.yourdomain.com
AUTH_RESEND_API_KEY=re_xxxxxxxxxxxxx

# Web URLs
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://app.yourdomain.com
NEXT_PUBLIC_ADMIN_URL=https://admin.yourdomain.com

# Mobile
EXPO_PUBLIC_BASE_URL=https://api.yourdomain.com

# Analytics (Optional)
POSTHOG_API_KEY=phc_xxxxxxxxxxxxx
POSTHOG_HOSTNAME=https://us.i.posthog.com
EXPO_PUBLIC_POSTHOG_API_KEY=phc_xxxxxxxxxxxxx
EXPO_PUBLIC_POSTHOG_HOSTNAME=https://us.i.posthog.com
```

### Generate Secrets

```bash
# Generate AUTH_SECRET and BETTER_AUTH_SECRET
openssl rand -base64 32
```

## Database Deployment

### Option 1: Neon (Recommended)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` in `.env`

### Option 2: Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings > Database
3. Update `DATABASE_URL`

### Option 3: Railway

1. Create project at [railway.app](https://railway.app)
2. Add PostgreSQL plugin
3. Copy `DATABASE_URL` from variables

### Option 4: AWS RDS

1. Create PostgreSQL instance
2. Configure security groups
3. Get connection string
4. Update `DATABASE_URL`

### Run Migrations

```bash
# From local machine
pnpm db:migrate:production

# Or on server after deployment
pnpm --filter @repo/db migrate:production
```

## API Server Deployment

### Option 1: Railway (Recommended)

1. **Connect Repository**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login
   railway login

   # Initialize
   railway init
   ```

2. **Configure Build**

   Create `railway.json`:
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS",
       "buildCommand": "pnpm install && pnpm --filter server build"
     },
     "deploy": {
       "startCommand": "pnpm --filter server start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

3. **Add Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set DATABASE_URL=<your-db-url>
   # Add all other env vars
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Initialize App**
   ```bash
   fly launch
   ```

3. **Configure `fly.toml`**
   ```toml
   app = "voltig-api"

   [build]
     [build.args]
       NODE_VERSION = "22"

   [env]
     PORT = "4000"
     NODE_ENV = "production"

   [[services]]
     internal_port = 4000
     protocol = "tcp"

     [[services.ports]]
       handlers = ["http"]
       port = 80

     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443
   ```

4. **Set Secrets**
   ```bash
   fly secrets set DATABASE_URL=<your-db-url>
   fly secrets set AUTH_SECRET=<secret>
   # Add all secrets
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

### Option 3: Docker

1. **Create Dockerfile**

   `apps/server/Dockerfile`:
   ```dockerfile
   FROM node:22-alpine AS base

   # Install pnpm
   RUN corepack enable pnpm

   FROM base AS dependencies
   WORKDIR /app
   COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
   COPY apps/server/package.json ./apps/server/
   COPY packages/*/package.json ./packages/*/
   RUN pnpm install --frozen-lockfile

   FROM base AS build
   WORKDIR /app
   COPY . .
   COPY --from=dependencies /app/node_modules ./node_modules
   RUN pnpm --filter server build

   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV=production

   COPY --from=build /app/apps/server/dist ./dist
   COPY --from=build /app/apps/server/package.json ./
   COPY --from=build /app/node_modules ./node_modules

   EXPOSE 4000

   CMD ["node", "dist/server.js"]
   ```

2. **Build and Push**
   ```bash
   docker build -t voltig-api:latest -f apps/server/Dockerfile .
   docker tag voltig-api:latest registry.example.com/voltig-api:latest
   docker push registry.example.com/voltig-api:latest
   ```

3. **Deploy to your container platform**

## Web Applications Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   pnpm i -g vercel
   ```

2. **Deploy Each App**

   **Landing Page:**
   ```bash
   cd apps/landing
   vercel --prod
   ```

   **Main App:**
   ```bash
   cd apps/app
   vercel --prod
   ```

   **Admin:**
   ```bash
   cd apps/admin
   vercel --prod
   ```

3. **Configure Environment Variables**

   In Vercel dashboard for each app:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_ADMIN_URL`

4. **Set Custom Domains**
   - Landing: `yourdomain.com`
   - App: `app.yourdomain.com`
   - Admin: `admin.yourdomain.com`

### Option 2: Netlify

Similar to Vercel:
1. Connect repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Option 3: Cloudflare Pages

1. Connect repository
2. Configure build:
   - Build command: `pnpm --filter <app> build`
   - Output directory: `dist`
3. Set environment variables
4. Deploy

## Mobile App Deployment

### Prerequisites

1. **Expo Account**
   ```bash
   npx expo login
   ```

2. **Configure EAS**
   ```bash
   cd apps/mobile
   npx eas-cli login
   ```

### iOS Deployment

1. **Configure Credentials**

   `apps/mobile/eas.json`:
   ```json
   {
     "cli": {
       "version": ">= 5.0.0"
     },
     "build": {
       "production": {
         "ios": {
           "buildConfiguration": "Release"
         }
       }
     },
     "submit": {
       "production": {
         "ios": {
           "appleId": "your@email.com",
           "ascAppId": "1234567890",
           "appleTeamId": "ABCDEFGHIJ"
         }
       }
     }
   }
   ```

2. **Build**
   ```bash
   APP_ENV=production eas build --platform ios --profile production
   ```

3. **Submit to App Store**
   ```bash
   eas submit --platform ios --profile production
   ```

### Android Deployment

1. **Configure Credentials**

   Update `eas.json`:
   ```json
   {
     "submit": {
       "production": {
         "android": {
           "serviceAccountKeyPath": "./google-service-account.json"
         }
       }
     }
   }
   ```

2. **Build**
   ```bash
   APP_ENV=production eas build --platform android --profile production
   ```

3. **Submit to Play Store**
   ```bash
   eas submit --platform android --profile production
   ```

### Over-the-Air Updates

Configure EAS Update:

```bash
# Install
npx expo install expo-updates

# Configure
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"
```

## Email Service Setup

### Resend (Recommended)

1. Create account at [resend.com](https://resend.com)
2. Verify domain
3. Generate API key
4. Update `AUTH_RESEND_API_KEY`

### SendGrid

1. Create account
2. Verify sender
3. Generate API key
4. Update email templates

## SSL/TLS Configuration

### Automatic (Vercel/Railway/Fly.io)

SSL is automatically configured.

### Manual (Custom Server)

1. **Get Certificate (Let's Encrypt)**
   ```bash
   certbot certonly --standalone -d api.yourdomain.com
   ```

2. **Configure Fastify**
   ```typescript
   const server = fastify({
     https: {
       key: fs.readFileSync('/path/to/key.pem'),
       cert: fs.readFileSync('/path/to/cert.pem'),
     },
   });
   ```

3. **Auto-Renewal**
   ```bash
   certbot renew --quiet
   ```

## Monitoring & Logging

### Application Monitoring

**Option 1: Sentry**
```bash
pnpm add @sentry/node @sentry/react

# Initialize in server
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://xxxxx@sentry.io/xxxxx',
  environment: 'production',
});
```

**Option 2: New Relic**
```bash
pnpm add newrelic

# Add config file
```

### Logging

**Production Logs:**
```bash
# Railway
railway logs

# Fly.io
fly logs

# Docker
docker logs <container-id>
```

**Log Aggregation:**
- Datadog
- Papertrail
- Logtail

## Health Checks

Configure health check endpoint:

```typescript
// apps/server/src/server.ts
server.get('/health', async (request, reply) => {
  const dbHealth = await checkDatabaseConnection();

  return {
    status: dbHealth ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
  };
});
```

Configure platform health checks:
- **Railway**: Auto-configured
- **Fly.io**: In `fly.toml`
- **Docker**: Healthcheck in Dockerfile

## Performance Optimization

### CDN Configuration

1. **Cloudflare** (Recommended)
   - Add domain
   - Update nameservers
   - Enable caching
   - Configure WAF

2. **Vercel Edge**
   - Automatic for Vercel deployments

### Database Optimization

1. **Connection Pooling**
   ```bash
   DATABASE_URL=postgresql://user:pass@host:5432/db?pgbouncer=true
   ```

2. **Read Replicas**
   - Configure in database provider
   - Update connection strings

3. **Query Optimization**
   - Add indexes
   - Use EXPLAIN ANALYZE
   - Monitor slow queries

## Backup Strategy

### Database Backups

**Automated (Neon/Supabase/Railway):**
- Daily automatic backups
- Point-in-time recovery

**Manual:**
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Application Backups

- Code: Version controlled in Git
- Environment: Securely stored
- Assets: S3 or equivalent

## Rollback Procedure

### API Server

**Railway:**
```bash
railway rollback
```

**Fly.io:**
```bash
fly releases
fly releases rollback <version>
```

### Web Apps

**Vercel:**
- Dashboard > Deployments > Redeploy previous

### Mobile

**EAS Update:**
```bash
eas update --branch production --message "Rollback"
```

## Security Checklist

- [ ] Environment variables secured
- [ ] Database SSL enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Security headers configured (Helmet)
- [ ] Secrets rotated regularly
- [ ] Dependencies updated
- [ ] Error messages don't expose sensitive data
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using ORM)
- [ ] XSS prevention
- [ ] CSRF protection

## Cost Optimization

### Free Tiers

- **Database**: Neon (Free tier)
- **API**: Railway ($5/month starter)
- **Web Apps**: Vercel (Free for personal)
- **Mobile**: EAS (Free tier available)

### Estimated Monthly Costs

**Minimal Setup:**
- Database: $0-10
- API Server: $5-20
- Web Hosting: $0-20
- Mobile: $0
- Email: $0-10
- **Total: $5-60/month**

**Production Scale:**
- Database: $25-100
- API Server: $20-100
- CDN: $20-50
- Email: $10-50
- Monitoring: $0-50
- **Total: $75-350/month**

## Troubleshooting

### Build Failures

```bash
# Clear caches
pnpm clean:workspaces
pnpm install

# Check Node version
node --version  # Should be >= 22.20.0

# Verify build locally
pnpm build
```

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL

# Check SSL requirement
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

### CORS Errors

Ensure API server CORS includes web app domains:

```typescript
await server.register(cors, {
  origin: [
    'https://yourdomain.com',
    'https://app.yourdomain.com',
    'https://admin.yourdomain.com',
  ],
  credentials: true,
});
```

## Post-Deployment

### Verify Deployment

1. **API Health**
   ```bash
   curl https://api.yourdomain.com/health
   ```

2. **Web Apps**
   - Visit each domain
   - Test authentication
   - Verify API connectivity

3. **Mobile**
   - Test on real devices
   - Verify push notifications
   - Check API connectivity

### Monitor Performance

- Check response times
- Monitor error rates
- Review logs
- Set up alerts

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm --filter server build
      # Deploy to Railway/Fly.io/etc

  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm --filter app build
      # Deploy to Vercel
```

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/your-repo/issues)
- Review platform documentation
- Contact platform support

---

Last updated: 2025-10-02
