<div align="center">

# ⚡ Voltig Turbo

### Modern Full-Stack TypeScript Monorepo

_Enterprise-grade starter template with React Native mobile app, multiple web portals, and robust API backend_

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.17-f69220?logo=pnpm)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-latest-ef4444?logo=turborepo)](https://turbo.build/)

[📱 Mobile](#mobile-development) • [🌐 Web Apps](#development) • [🚀 Quick Start](#quick-start) • [📚 Docs](#documentation)

</div>

---

## 🌟 Overview

**Voltig Turbo** is a sophisticated monorepo application designed for modern startups. Build once, deploy everywhere with native iOS/Android mobile apps and responsive web applications—all sharing the same type-safe API.

### ✨ Key Features

<table>
<tr>
<td width="33%">

**📱 Multi-Platform**

- Native iOS/Android apps
- Responsive web portals
- Shared codebase

</td>
<td width="33%">

**🔒 Type-Safe**

- End-to-end type safety
- tRPC API integration
- Zero runtime errors

</td>
<td width="33%">

**🎨 UI Library**

- 46+ components
- Accessible (Radix UI)
- Tailwind CSS 4

</td>
</tr>
<tr>
<td width="33%">

**🔐 Authentication**

- Better Auth integration
- Email verification
- Multi-role support

</td>
<td width="33%">

**⚡ Real-Time**

- React Query sync
- WebSocket support
- Optimistic updates

</td>
<td width="33%">

**🚀 Production Ready**

- Docker support
- Rate limiting
- Error tracking

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### 🎨 Frontend

- ⚛️ **React 19** with **TypeScript 5.9**
- 🗺️ **TanStack Router + Start** (SSR-capable)
- 📱 **React Native** via **Expo 54**
- 🎨 **Tailwind CSS 4** + **NativeWind**
- ♿ **Radix UI** (accessible components)

</td>
<td valign="top" width="50%">

### ⚙️ Backend

- ⚡ **Fastify 5** (high-performance)
- 🔌 **tRPC 11** (type-safe API)
- 🐘 **PostgreSQL 17** + **Drizzle ORM**
- 🔐 **Better Auth** (authentication)
- 📝 **Pino** (structured logging)

</td>
</tr>
<tr>
<td valign="top" colspan="2">

### 🔧 Development Tools

- 🚀 **Turborepo** (monorepo orchestration)
- 📦 **pnpm** (fast package manager)
- ⚡ **Vite 7** (lightning-fast builds)
- ✨ **Biome** (linting + formatting)
- 🐳 **Docker Compose** (containerization)

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 voltig-turbo/
┣━━ 📱 apps/
┃   ┣━━ mobile/          # React Native app (Expo)
┃   ┣━━ app/             # Main web application (port 3001)
┃   ┣━━ admin/           # Admin dashboard (port 3002)
┃   ┣━━ landing/         # Marketing site (port 3000)
┃   ┗━━ server/          # Fastify API server (port 4000)
┣━━ 📦 packages/
┃   ┣━━ api/             # tRPC routers and procedures
┃   ┣━━ auth/            # Better Auth configuration
┃   ┣━━ db/              # Drizzle schemas and client
┃   ┣━━ web-ui/          # Shared React components (46+)
┃   ┣━━ emails/          # Email templates (React Email)
┃   ┣━━ validators/      # Shared Zod schemas
┃   ┗━━ analytics/       # PostHog integration
┣━━ 🔧 tooling/
┃   ┣━━ tsconfig/        # Shared TypeScript configs
┃   ┣━━ tailwind-config/ # Tailwind CSS v4 config
┃   ┗━━ biome-config/    # Biome linting config
┗━━ 📚 docs/             # Documentation
```

---

## 🚀 Quick Start

### 📋 Prerequisites

| Tool                        | Version    | Required For        |
| --------------------------- | ---------- | ------------------- |
| 🟢 **Node.js**              | >= 22.20.0 | All apps            |
| 📦 **pnpm**                 | >= 10.17.1 | Package management  |
| 🐳 **Docker**               | Latest     | PostgreSQL database |
| 📱 **Xcode/Android Studio** | Latest     | Mobile development  |

### ⚙️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd voltig-turbo

# Install dependencies
pnpm install

# Copy environment files
cp .env.example .env
cp .env.development.example .env.development

# Configure your environment variables
# Edit .env and .env.development with your values
```

### 🗄️ Database Setup

```bash
# 1️⃣ Start PostgreSQL via Docker
pnpm --filter server db:up

# 2️⃣ Generate database schema
pnpm db:generate:development

# 3️⃣ Run migrations
pnpm db:migrate:development

# 4️⃣ Generate auth tables
pnpm auth:generate:development
```

### 🎯 Development

```bash
# Start all development servers (watch mode)
pnpm dev

# Or start individual apps:
pnpm -F landing dev    # Marketing site (http://localhost:3000)
pnpm -F app dev        # Web app (http://localhost:3001)
pnpm -F admin dev      # Admin dashboard (http://localhost:3002)
pnpm -F server dev     # API server (http://localhost:4000)
pnpm -F mobile dev     # Mobile app (Expo dev server)
```

### 📱 Mobile Development

```bash
# 🛠️ Development build
pnpm prebuild:development
pnpm android:development  # 🤖 Run on Android
pnpm ios:development      # 🍎 Run on iOS

# 🚀 Production build
pnpm prebuild:production
pnpm android:production   # 🤖 Android release
pnpm ios:production       # 🍎 iOS release
```

---

## 🔐 Environment Variables

### 📝 Required Variables

Create `.env.development` with:

```bash
# App Environment
APP_ENV=development

# API URLs
EXPO_PUBLIC_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
BASE_URL=http://localhost:4000

# Web App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_ADMIN_URL=http://localhost:3002

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/voltig

# Analytics (PostHog)
EXPO_PUBLIC_POSTHOG_API_KEY=your_key
EXPO_PUBLIC_POSTHOG_HOSTNAME=https://us.i.posthog.com
POSTHOG_API_KEY=your_key
POSTHOG_HOSTNAME=https://us.i.posthog.com
```

For production, create `.env` with production-specific values including:

- `NODE_ENV=production`
- `AUTH_SECRET` and `BETTER_AUTH_SECRET`
- `AUTH_RESEND_API_KEY` (for email)
- Production database URL

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment guide.

---

## 📜 Available Scripts

### 🎯 Root Commands

```bash
# Development
pnpm dev                    # Start all apps in watch mode
pnpm build                  # Build all apps
pnpm typecheck              # Type check all packages

# Code Quality
pnpm check                  # Check format and lint
pnpm check:fix              # Format and fix all issues
pnpm lint                   # Lint code
pnpm lint:fix               # Lint and auto-fix
pnpm format                 # Format code
pnpm format:fix             # Format and write changes

# Database
pnpm db:generate:development    # Generate schema
pnpm db:migrate:development     # Run migrations
pnpm db:push:development        # Push schema changes
pnpm db:studio:development      # Open Drizzle Studio

# Cleanup
pnpm clean                  # Clean root node_modules
pnpm clean:workspaces       # Clean all workspaces
```

### Workspace Commands

```bash
# Run command in specific workspace
pnpm --filter <workspace> <command>
pnpm -F <workspace> <command>  # Short alias

# Examples:
pnpm -F mobile dev
pnpm -F server build
pnpm -F @repo/web-ui typecheck
```

## Application Ports

| Application   | Port | URL                   |
| ------------- | ---- | --------------------- |
| Landing       | 3000 | http://localhost:3000 |
| App           | 3001 | http://localhost:3001 |
| Admin         | 3002 | http://localhost:3002 |
| Email Preview | 3004 | http://localhost:3004 |
| API Server    | 4000 | http://localhost:4000 |
| PostgreSQL    | 5432 | localhost:5432        |

---

## 📚 Documentation

| Document                                          | Description                 |
| ------------------------------------------------- | --------------------------- |
| 🏗️ [Architecture Overview](docs/ARCHITECTURE.md)  | System design and patterns  |
| 🚀 [Deployment Guide](docs/DEPLOYMENT.md)         | Production deployment steps |
| 🤝 [Contributing Guidelines](CONTRIBUTING.md)     | How to contribute           |
| 📱 [Mobile App](apps/mobile/README.md)            | React Native app docs       |
| ⚙️ [API Server](apps/server/README.md)            | Backend API documentation   |
| 🎨 [Component Library](packages/web-ui/README.md) | UI components reference     |

---

## 📦 Key Packages

### 📱 Applications

| Package                                  | Description              | Tech                |
| ---------------------------------------- | ------------------------ | ------------------- |
| 📱 **[mobile](apps/mobile/README.md)**   | React Native mobile app  | Expo 54, NativeWind |
| 🌐 **[app](apps/app/README.md)**         | Main web application     | React 19, TanStack  |
| 👨‍💼 **[admin](apps/admin/README.md)**     | Administrative dashboard | React 19, TanStack  |
| 🏠 **[landing](apps/landing/README.md)** | Marketing website        | React 19, SSR       |
| ⚡ **[server](apps/server/README.md)**   | Fastify API server       | tRPC, PostgreSQL    |

### 🔧 Shared Packages

| Package                                          | Description                              |
| ------------------------------------------------ | ---------------------------------------- |
| 🔌 **[@repo/api](packages/api/README.md)**       | tRPC API definitions and routers         |
| 🔐 **[@repo/auth](packages/auth/README.md)**     | Better Auth configuration                |
| 🗄️ **[@repo/db](packages/db/README.md)**         | Drizzle schemas and database client      |
| 🎨 **[@repo/web-ui](packages/web-ui/README.md)** | React component library (46+ components) |
| 📧 **[@repo/emails](packages/emails/README.md)** | React Email templates                    |

---

## 🔐 Authentication

Built with **Better Auth** for secure, cross-platform authentication:

<table>
<tr>
<td width="50%">

**Features**

- 📧 Email/password authentication
- ✅ Email verification required
- ⏰ Session management (7-day expiry)
- 🎭 Multi-role support

</td>
<td width="50%">

**Roles**

- 👨‍💼 Admin
- 🏪 Merchant
- 👤 Customer
- 🔄 OAuth proxy for mobile

</td>
</tr>
</table>

---

## 🗄️ Database

**PostgreSQL 17** with **Drizzle ORM** for type-safe database operations:

```bash
# 🔍 View database in browser
pnpm db:studio:development

# 📝 Generate new migration
pnpm db:generate:development

# ✅ Apply migrations
pnpm db:migrate:development
```

**Schema includes:**

- 👥 User management (users, sessions, accounts)
- ✉️ Email verification
- 📊 Application data (extendable schema)

---

## 🧪 Testing

```bash
# 🧪 Run tests in specific workspace
pnpm --filter <workspace> test

# 📱 Example: Test web app
pnpm -F app test

# 🤖 Mobile E2E tests with Maestro
pnpm maestro:test
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### 🔄 Development Workflow

1. 🌿 Create a feature branch
2. ✏️ Make your changes
3. ✨ Run `pnpm check:fix` to format and lint
4. 🔍 Run `pnpm typecheck` to verify types
5. 🧪 Test your changes thoroughly
6. 🚀 Submit a pull request

---

## 📄 License

[Your License Here]

---

## 💬 Support

Need help? We're here for you:

- 💬 [Open an issue on GitHub](https://github.com/your-repo/issues)
- 📧 Contact the development team
- 📚 Check out our [documentation](#documentation)

---

<div align="center">

**Built with ❤️ using modern TypeScript and React**

⭐ Star us on GitHub — it motivates us a lot!

[🏠 Home](#-voltig-turbo) • [🚀 Quick Start](#-quick-start) • [📚 Docs](#-documentation) • [🤝 Contributing](#-contributing)

</div>
