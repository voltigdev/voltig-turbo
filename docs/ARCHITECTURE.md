<div align="center">

# 🏗️ Voltig Turbo Architecture

### System Design & Technical Documentation

_Comprehensive architecture guide for the Voltig Turbo monorepo_

[🏠 Back to README](../README.md) • [🚀 Deployment](DEPLOYMENT.md) • [🤝 Contributing](../CONTRIBUTING.md)

</div>

---

## 🌟 Overview

**Voltig Turbo** is a modern full-stack TypeScript monorepo built for scalability and developer experience:

<table>
<tr>
<td width="25%">

**📱 Mobile**

- React Native
- Expo 54
- NativeWind

</td>
<td width="25%">

**🌐 Web Apps**

- React 19
- TanStack
- SSR-capable

</td>
<td width="25%">

**⚡ API**

- Fastify
- tRPC
- Type-safe

</td>
<td width="25%">

**📦 Packages**

- Shared code
- Reusable
- Type-safe

</td>
</tr>
</table>

---

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph Clients["🖥️ Client Applications"]
        Mobile["📱 Mobile App<br/>(Expo/React Native)"]
        WebApp["🌐 Web App<br/>(React 19)<br/>Port: 3001"]
        Admin["👨‍💼 Admin Dashboard<br/>(React 19)<br/>Port: 3002"]
        Landing["🏠 Landing Page<br/>(React 19)<br/>Port: 3000"]
    end

    subgraph Backend["⚡ Backend Services"]
        API["🚀 API Server<br/>(Fastify + tRPC)<br/>Port: 4000"]
        Auth["🔐 Better Auth<br/>(Sessions)"]
    end

    subgraph Data["🗄️ Data Layer"]
        DB["🐘 PostgreSQL 17<br/>(Drizzle ORM)<br/>Port: 5432"]
    end

    Mobile -->|"tRPC (Type-safe)"| API
    WebApp -->|"tRPC (Type-safe)"| API
    Admin -->|"tRPC (Type-safe)"| API
    Landing -->|"tRPC (Type-safe)"| API

    API --> Auth
    API --> DB
    Auth --> DB

    style Clients fill:#e3f2fd
    style Backend fill:#fff3e0
    style Data fill:#f3e5f5
```

---

## 🛠️ Technology Stack

### 🎨 Frontend Technologies

<table>
<tr>
<td valign="top" width="50%">

#### 🌐 Web Applications

| Technology             | Version | Purpose               |
| ---------------------- | ------- | --------------------- |
| ⚛️ **React**           | 19.1.0  | UI framework          |
| 🗺️ **TanStack Router** | Latest  | File-based routing    |
| 🚀 **TanStack Start**  | Latest  | SSR capabilities      |
| ⚡ **Vite**            | 7.x     | Build tool            |
| 🎨 **Tailwind CSS**    | 4.x     | Styling               |
| ♿ **Radix UI**        | Latest  | Accessible primitives |
| 🔄 **React Query**     | Latest  | Server state          |
| 🐻 **Zustand**         | Latest  | Client state          |
| 📝 **React Hook Form** | Latest  | Form handling         |
| ✅ **Zod**             | 4.1.11  | Validation            |
| 🎭 **Lucide React**    | Latest  | Icons                 |

</td>
<td valign="top" width="50%">

#### 📱 Mobile Application

| Technology           | Version | Purpose              |
| -------------------- | ------- | -------------------- |
| 📱 **React Native**  | 0.81.4  | Mobile framework     |
| 🎯 **Expo**          | 54.x    | Development platform |
| 🗺️ **Expo Router**   | 6.x     | File-based routing   |
| 🎨 **NativeWind**    | Latest  | Tailwind for RN      |
| 🔄 **React Query**   | Latest  | Server state         |
| 🐻 **Zustand**       | Latest  | Client state         |
| 🔒 **SecureStore**   | Latest  | Secure storage       |
| 🔔 **Notifications** | Latest  | Push notifications   |
| 📍 **Location**      | Latest  | Geolocation          |

</td>
</tr>
</table>

### ⚙️ Backend Technologies

| Technology           | Version | Purpose            |
| -------------------- | ------- | ------------------ |
| ⚡ **Fastify**       | 5.6.0   | Web server         |
| 🔌 **tRPC**          | 11.4.0  | Type-safe API      |
| 🐘 **PostgreSQL**    | 17.x    | Database           |
| 🗄️ **Drizzle ORM**   | 0.44.4  | Database ORM       |
| 🔐 **Better Auth**   | 1.3.24  | Authentication     |
| ✅ **Zod**           | 4.1.11  | Schema validation  |
| 📝 **Pino**          | Latest  | Logging            |
| 🛡️ **Helmet**        | Latest  | Security headers   |
| 🚦 **Rate Limiting** | Latest  | Request throttling |

### 🔧 Infrastructure & Tooling

| Technology         | Version | Purpose                |
| ------------------ | ------- | ---------------------- |
| 🚀 **Turborepo**   | 2.5.8   | Monorepo orchestration |
| 📦 **pnpm**        | 10.17.1 | Package manager        |
| 📘 **TypeScript**  | 5.9.3   | Type safety            |
| ✨ **Biome**       | 2.2.4   | Linting & formatting   |
| 📧 **React Email** | 4.2.12  | Email templates        |
| 📊 **PostHog**     | Latest  | Analytics              |
| 🐳 **Docker**      | Latest  | Containerization       |

---

## 📁 Monorepo Structure

### 📂 Workspace Organization

```
📦 voltig-turbo/
┣━━ 📱 apps/                      # Application layer
┃   ┣━━ mobile/                   # React Native mobile app
┃   ┣━━ app/                      # Main web application
┃   ┣━━ admin/                    # Admin dashboard
┃   ┣━━ landing/                  # Marketing website
┃   ┗━━ server/                   # Fastify API server
┣━━ 📦 packages/                  # Shared packages
┃   ┣━━ api/                      # tRPC API definitions
┃   ┣━━ auth/                     # Authentication config
┃   ┣━━ db/                       # Database schemas (Drizzle)
┃   ┣━━ web-ui/                   # React component library (46+)
┃   ┣━━ emails/                   # Email templates (React Email)
┃   ┣━━ validators/               # Shared Zod schemas
┃   ┗━━ analytics/                # PostHog integration
┗━━ 🔧 tooling/                   # Build & development tools
    ┣━━ tsconfig/                 # TypeScript configurations
    ┣━━ tailwind-config/          # Tailwind CSS v4 config
    ┗━━ biome-config/             # Biome linting config
```

### 🔗 Dependency Graph

```mermaid
graph TD
    subgraph Apps["📱 Applications"]
        Mobile[Mobile App]
        WebApp[Web App]
        Admin[Admin]
        Landing[Landing]
        Server[Server]
    end

    subgraph Packages["📦 Shared Packages"]
        API[🔌 api]
        Auth[🔐 auth]
        DB[🗄️ db]
        WebUI[🎨 web-ui]
        Emails[📧 emails]
        Validators[✅ validators]
        Analytics[📊 analytics]
    end

    Mobile --> API
    Mobile --> Auth
    Mobile --> Analytics

    WebApp --> API
    WebApp --> Auth
    WebApp --> WebUI
    WebApp --> Analytics

    Admin --> API
    Admin --> Auth
    Admin --> WebUI

    Landing --> API
    Landing --> WebUI

    Server --> API
    Server --> Auth
    Server --> DB
    Server --> Emails

    API --> DB
    API --> Validators
    Auth --> DB
    Auth --> Validators
    DB --> Validators

    style Apps fill:#e3f2fd
    style Packages fill:#f3e5f5
```

---

## 🔄 Data Flow

### 🔐 Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant Client as 📱/🌐 Client
    participant tRPC as 🔌 tRPC
    participant Auth as 🔐 Better Auth
    participant DB as 🗄️ PostgreSQL

    User->>Client: Enter credentials
    Client->>tRPC: Login request
    tRPC->>Auth: Validate credentials
    Auth->>DB: Check user & password
    DB-->>Auth: User data
    Auth->>DB: Create session
    DB-->>Auth: Session created
    Auth-->>tRPC: Session token
    tRPC-->>Client: JWT token + user data
    Client-->>User: Logged in

    Note over Client,DB: Subsequent Requests

    User->>Client: Make request
    Client->>tRPC: Request + token
    tRPC->>Auth: Validate token
    Auth->>DB: Load session
    DB-->>Auth: Session data
    Auth-->>tRPC: User context
    tRPC->>tRPC: Execute procedure
    tRPC-->>Client: Typed response
```

### ⚡ API Request Flow

```mermaid
flowchart TD
    Start([👤 User Action]) --> ClientCall[📱 Client calls<br/>tRPC method]
    ClientCall --> HTTPReq[🌐 HTTP POST to<br/>/trpc/method]
    HTTPReq --> Fastify[⚡ Fastify receives<br/>request]
    Fastify --> tRPCPlugin[🔌 tRPC Plugin]

    tRPCPlugin --> CreateCtx[🔧 Create Context<br/>user, db, etc]
    CreateCtx --> Middleware{🛡️ Run Middleware<br/>auth check}

    Middleware -->|❌ Unauthorized| Error[🚫 401 Error]
    Middleware -->|✅ Authorized| Validate[✅ Validate Input<br/>Zod schema]

    Validate -->|❌ Invalid| ValidationErr[🚫 400 Error]
    Validate -->|✅ Valid| Execute[⚙️ Execute<br/>Procedure]

    Execute --> DBQuery[🗄️ Database Query<br/>Drizzle ORM]
    DBQuery --> Serialize[📦 Serialize Response<br/>SuperJSON]
    Serialize --> Response[📤 Send Response]
    Response --> ClientReceive[📱 Client receives<br/>typed data]
    ClientReceive --> End([✨ UI Updates])

    Error --> End
    ValidationErr --> End

    style Start fill:#e3f2fd
    style End fill:#c8e6c9
    style Error fill:#ffcdd2
    style ValidationErr fill:#ffcdd2
```

---

## 🗄️ Database Architecture

### 📊 Schema Organization

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has
    USER ||--o{ VERIFICATION : has

    USER {
        uuid id PK
        string email
        string name
        string role
        timestamp createdAt
    }

    SESSION {
        uuid id PK
        uuid userId FK
        string token
        timestamp expiresAt
    }

    ACCOUNT {
        uuid id PK
        uuid userId FK
        string provider
        string providerAccountId
    }

    VERIFICATION {
        uuid id PK
        uuid userId FK
        string code
        timestamp expiresAt
    }
```

### 🔧 Database Configuration

| Feature             | Implementation | Notes                              |
| ------------------- | -------------- | ---------------------------------- |
| **Driver**          | `postgres.js`  | High-performance PostgreSQL driver |
| **Pool Size**       | Auto-managed   | Dynamically scales connections     |
| **SSL**             | Configurable   | Per-environment SSL settings       |
| **Migrations**      | Drizzle Kit    | Version-controlled schema changes  |
| **Type Generation** | Drizzle        | Automatic TypeScript types         |

---

## 🔒 Security Architecture

### 🛡️ Security Layers

```mermaid
graph TB
    subgraph Layer1["🌐 Layer 1: Transport Security"]
        HTTPS[HTTPS in Production]
        Cookies[Secure Cookies<br/>httpOnly, sameSite]
        CORS[CORS Whitelist]
    end

    subgraph Layer2["🔐 Layer 2: Authentication"]
        BetterAuth[Better Auth<br/>Session Management]
        Hashing[Password Hashing<br/>bcrypt]
        EmailVerif[Email Verification]
        SessionExp[Session Expiry<br/>7 days]
    end

    subgraph Layer3["👤 Layer 3: Authorization"]
        RBAC[Role-Based Access<br/>admin/merchant/customer]
        Protected[tRPC Protected<br/>Procedures]
        Ownership[Resource Ownership<br/>Checks]
    end

    subgraph Layer4["✅ Layer 4: Input Validation"]
        Zod[Zod Schema<br/>Validation]
        SQLPrevention[SQL Injection<br/>Prevention ORM]
        XSSPrevention[XSS Prevention<br/>React Escaping]
    end

    subgraph Layer5["🚦 Layer 5: Rate Limiting"]
        RateLimit[Fastify Rate Limit]
        IPThrottle[Per-IP Throttling]
        ConfigLimits[Configurable Limits]
    end

    subgraph Layer6["🔐 Layer 6: Security Headers"]
        Helmet[Helmet Middleware]
        CSP[Content Security<br/>Policy]
        HSTS[HTTP Strict<br/>Transport Security]
        XFrame[X-Frame-Options]
    end

    Layer1 --> Layer2
    Layer2 --> Layer3
    Layer3 --> Layer4
    Layer4 --> Layer5
    Layer5 --> Layer6

    style Layer1 fill:#ffebee
    style Layer2 fill:#fce4ec
    style Layer3 fill:#f3e5f5
    style Layer4 fill:#ede7f6
    style Layer5 fill:#e8eaf6
    style Layer6 fill:#e3f2fd
```

### 🔐 Security Features Summary

<table>
<tr>
<td width="50%">

**🌐 Transport & Network**

- ✅ HTTPS enforced in production
- ✅ Secure cookie configuration
- ✅ CORS whitelist protection
- ✅ Rate limiting per IP

</td>
<td width="50%">

**🔒 Authentication & Authorization**

- ✅ Better Auth integration
- ✅ bcrypt password hashing
- ✅ Email verification required
- ✅ Role-based access control

</td>
</tr>
<tr>
<td width="50%">

**✅ Input & Data Validation**

- ✅ Zod schema validation
- ✅ SQL injection prevention
- ✅ XSS attack prevention
- ✅ Type-safe API calls

</td>
<td width="50%">

**🛡️ Headers & Protection**

- ✅ Helmet security headers
- ✅ Content Security Policy
- ✅ HSTS enabled
- ✅ X-Frame-Options set

</td>
</tr>
</table>

---

## 🎯 Type Safety

### 🔗 End-to-End Type Flow

```mermaid
flowchart LR
    subgraph DB["🗄️ Database Layer"]
        Schema[Define Schema<br/>packages/db]
    end

    subgraph API["🔌 API Layer"]
        Router[Define Router<br/>packages/api]
    end

    subgraph Client["📱 Client Layer"]
        UseQuery[Use in Client<br/>apps/app]
    end

    Schema -->|"Drizzle generates<br/>TypeScript types"| Router
    Router -->|"tRPC infers<br/>procedure types"| UseQuery
    UseQuery -->|"Fully typed<br/>data & errors"| Result[✨ Type-safe<br/>UI]

    style DB fill:#f3e5f5
    style API fill:#fff3e0
    style Client fill:#e3f2fd
    style Result fill:#c8e6c9
```

### 📝 Type Safety Example

```typescript
// 1️⃣ Define schema (packages/db)
export const todo = pgTable("todo", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
});

// 2️⃣ Define API (packages/api)
export const todoRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todo.findMany();
  }),
});

// 3️⃣ Use in client (apps/app)
const { data } = api.todo.list.useQuery();
//    ^? data: Todo[] | undefined (fully typed!)
//       ✨ Autocomplete, refactoring, type checking!
```

### 🔧 Type Generation Pipeline

| Layer              | Tool        | Output                               |
| ------------------ | ----------- | ------------------------------------ |
| 🗄️ **Database**    | Drizzle Kit | Introspects PostgreSQL → TS types    |
| 🔌 **API**         | tRPC        | Infers types from router definitions |
| 📝 **Forms**       | Zod         | Schema → TypeScript types            |
| 🌍 **Environment** | @t3-oss/env | Validates env vars at build time     |
| 📦 **Packages**    | TypeScript  | Strict mode + path aliases           |

---

## ⚡ Performance Optimizations

### 🚀 Optimization Strategy

<table>
<tr>
<td valign="top" width="33%">

#### 🌐 Frontend

**Code Optimization**

- ✂️ Route-based code splitting
- 🌳 Automatic tree shaking (Vite)
- 🖼️ WebP images + lazy loading
- 🧠 React.memo optimization
- 📜 Virtual lists (react-window)

**Caching**

- 💾 React Query cache
- 🔄 Stale-while-revalidate
- 📦 Service worker (optional)

</td>
<td valign="top" width="33%">

#### ⚙️ Backend

**Database**

- 🔌 Connection pooling
- 📊 Optimized SQL queries
- 🗄️ Indexed columns
- 📈 Query planning

**API**

- 🗜️ Response compression
- 🚦 Rate limiting
- 💾 Response caching
- ⚡ Async operations

</td>
<td valign="top" width="33%">

#### 📱 Mobile

**Runtime**

- ⚡ Hermes engine
- 🎨 60fps animations
- 🧵 UI thread optimization
- 📦 Metro tree shaking

**Assets**

- 🖼️ Image caching
- 📦 Bundle optimization
- 🔄 Code push updates
- 💾 Persistent storage

</td>
</tr>
</table>

### 📊 Performance Metrics

| Metric                           | Target  | Tool            |
| -------------------------------- | ------- | --------------- |
| **FCP** (First Contentful Paint) | < 1.5s  | Lighthouse      |
| **TTI** (Time to Interactive)    | < 3.0s  | Lighthouse      |
| **Bundle Size** (Web)            | < 200KB | Vite build      |
| **API Response**                 | < 200ms | Pino logs       |
| **Database Query**               | < 50ms  | Drizzle metrics |

---

## 🔄 State Management Strategy

### 📊 State Architecture

```mermaid
graph TB
    subgraph ServerState["🌐 Server State - React Query"]
        API[API Data Fetching]
        Cache[Cache Management]
        Optimistic[Optimistic Updates]
        Refetch[Background Refetching]
    end

    subgraph ClientState["🐻 Client State - Zustand"]
        UI[UI State<br/>modals, drawers]
        Prefs[User Preferences]
        Temp[Temporary Data]
    end

    subgraph FormState["📝 Form State - React Hook Form"]
        Validation[Form Validation]
        Fields[Field Management]
        Errors[Error Handling]
    end

    subgraph URLState["🔗 URL State - Router"]
        Params[Route Params]
        Query[Query Params]
        Hash[Hash State]
    end

    App[📱 Application] --> ServerState
    App --> ClientState
    App --> FormState
    App --> URLState

    style ServerState fill:#e3f2fd
    style ClientState fill:#f3e5f5
    style FormState fill:#fff3e0
    style URLState fill:#e8f5e9
```

### 🔍 State Management Examples

#### 🌐 Server State (React Query + tRPC)

```typescript
// ✅ Fetch data with automatic caching and refetching
const { data, isLoading, error } = api.todo.list.useQuery();

// ✅ Optimistic updates
const mutation = api.todo.create.useMutation({
  onMutate: async (newTodo) => {
    await utils.todo.list.cancel();
    const previous = utils.todo.list.getData();
    utils.todo.list.setData(undefined, (old) => [...old, newTodo]);
    return { previous };
  },
});
```

#### 🐻 Client State (Zustand)

```typescript
// ✅ Simple, performant global state
const useStore = create((set) => ({
  isModalOpen: false,
  currentTheme: "light",
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleTheme: () =>
    set((state) => ({
      currentTheme: state.currentTheme === "light" ? "dark" : "light",
    })),
}));
```

#### 📝 Form State (React Hook Form)

```typescript
// ✅ Type-safe forms with Zod validation
const form = useForm({
  resolver: zodResolver(todoSchema),
  defaultValues: { title: "", completed: false },
});

const onSubmit = form.handleSubmit((data) => {
  // data is fully typed!
  mutation.mutate(data);
});
```

### 📋 State Management Guidelines

| State Type          | Use When         | Tool            | Example                     |
| ------------------- | ---------------- | --------------- | --------------------------- |
| 🌐 **Server State** | Data from API    | React Query     | User list, todos, products  |
| 🐻 **Client State** | UI & preferences | Zustand         | Modal state, theme, sidebar |
| 📝 **Form State**   | Form management  | React Hook Form | Login, signup, settings     |
| 🔗 **URL State**    | Shareable state  | Router          | Search filters, pagination  |

---

## 🚀 Deployment Architecture

### 🛠️ Development Environment

```mermaid
graph TB
    subgraph Local["💻 Local Development Machine"]
        subgraph Apps["📱 Applications"]
            Landing["🏠 Landing<br/>:3000"]
            WebApp["🌐 App<br/>:3001"]
            Admin["👨‍💼 Admin<br/>:3002"]
            Mobile["📱 Mobile<br/>(Expo)"]
            Email["📧 Email Preview<br/>:3004"]
        end

        Server["⚡ API Server<br/>:4000"]

        Docker["🐳 Docker Compose"]
        DB["🐘 PostgreSQL<br/>:5432"]
    end

    Apps --> Server
    Server --> DB
    Docker --> DB

    style Local fill:#e3f2fd
    style Apps fill:#fff3e0
    style Docker fill:#f3e5f5
```

### 🌐 Production Architecture (Recommended)

```mermaid
graph TB
    subgraph CDN["☁️ CDN / Edge Network"]
        Static["📦 Static Assets<br/>Vercel/Cloudflare"]
        Landing["🏠 Landing"]
        WebApp["🌐 Web App"]
        Admin["👨‍💼 Admin"]
    end

    subgraph MobileStore["📱 Mobile Distribution"]
        AppStore["🍎 App Store"]
        PlayStore["🤖 Play Store"]
        EAS["📦 Expo EAS"]
    end

    subgraph Backend["⚡ Backend Infrastructure"]
        API["🚀 API Server<br/>Railway/Fly.io/Render"]
        Cache["💾 Redis Cache<br/>(optional)"]
    end

    subgraph Database["🗄️ Database Layer"]
        PG["🐘 PostgreSQL<br/>Neon/Supabase/RDS"]
        Backup["💾 Automated<br/>Backups"]
    end

    subgraph External["🔌 External Services"]
        Email["📧 Resend/SendGrid"]
        Analytics["📊 PostHog"]
        Monitoring["👀 Sentry"]
    end

    Static --> API
    Landing --> API
    WebApp --> API
    Admin --> API

    EAS --> AppStore
    EAS --> PlayStore
    AppStore --> API
    PlayStore --> API

    API --> Cache
    API --> PG
    API --> Email
    API --> Analytics
    API --> Monitoring

    PG --> Backup

    style CDN fill:#e3f2fd
    style MobileStore fill:#f3e5f5
    style Backend fill:#fff3e0
    style Database fill:#e8f5e9
    style External fill:#fce4ec
```

### 🔧 Deployment Options

| Component         | Recommended Platform | Alternative               |
| ----------------- | -------------------- | ------------------------- |
| 🏠 **Landing**    | Vercel               | Netlify, Cloudflare Pages |
| 🌐 **Web Apps**   | Vercel               | Netlify, Render           |
| 👨‍💼 **Admin**      | Vercel               | Netlify                   |
| ⚡ **API Server** | Railway              | Fly.io, Render, AWS       |
| 🐘 **Database**   | Neon                 | Supabase, Railway, RDS    |
| 📱 **Mobile**     | Expo EAS             | Manual builds             |
| 📧 **Emails**     | Resend               | SendGrid, Postmark        |
| 📊 **Analytics**  | PostHog Cloud        | Self-hosted               |

---

## 📈 Scalability & Monitoring

### 🔄 Scaling Strategy

```mermaid
graph LR
    subgraph Current["📦 Current State"]
        A1[Single API Instance]
        DB1[Single Database]
    end

    subgraph Phase1["📊 Phase 1: Vertical"]
        A2[Larger API Instance]
        DB2[Larger Database]
    end

    subgraph Phase2["🔄 Phase 2: Horizontal"]
        LB[Load Balancer]
        A3[API Instance 1]
        A4[API Instance 2]
        A5[API Instance 3]
        DBM[Primary Database]
        DBR1[Read Replica 1]
        DBR2[Read Replica 2]
    end

    Current -->|"More traffic"| Phase1
    Phase1 -->|"Even more traffic"| Phase2

    LB --> A3
    LB --> A4
    LB --> A5

    A3 --> DBM
    A4 --> DBM
    A5 --> DBM

    A3 -.->|reads| DBR1
    A4 -.->|reads| DBR1
    A5 -.->|reads| DBR2

    style Current fill:#ffebee
    style Phase1 fill:#fff3e0
    style Phase2 fill:#e8f5e9
```

### 💾 Caching Strategy

| Layer                   | Technology  | TTL    | Use Case              |
| ----------------------- | ----------- | ------ | --------------------- |
| 🌐 **Client**           | React Query | 5 min  | API responses         |
| ☁️ **CDN**              | Cloudflare  | 1 year | Static assets         |
| ⚡ **API**              | In-memory   | 1 min  | Expensive queries     |
| 🗄️ **Database**         | PostgreSQL  | N/A    | Query results         |
| 💾 **Redis** (optional) | Redis       | Varies | Sessions, rate limits |

### 👀 Monitoring & Observability

<table>
<tr>
<td valign="top" width="33%">

#### 📝 Logging

**Implementation**

- 📊 Structured logs (Pino)
- 🔍 JSON format
- 🔗 Correlation IDs
- 🚨 Error tracking (Sentry)

**Log Levels**

- 🔴 Error
- 🟡 Warning
- 🔵 Info
- ⚪ Debug

</td>
<td valign="top" width="33%">

#### 📊 Metrics

**Performance**

- ⚡ API response times
- 🗄️ Database query times
- 💾 Cache hit rates
- 🚦 Error rates

**User Analytics**

- 📊 PostHog events
- 👤 User flows
- 📱 Device metrics
- 🌍 Geographic data

</td>
<td valign="top" width="33%">

#### ✅ Health Checks

**Endpoints**

- `/health` - Basic health
- `/health/db` - Database
- `/health/ready` - Readiness

**Checks**

- 🐘 Database connection
- 🔐 Auth service
- 📧 Email service
- 💾 Cache (if used)

</td>
</tr>
</table>

---

## 🔮 Future Architecture Considerations

### 🚀 Potential Enhancements

```mermaid
graph TB
    Current[🏛️ Current<br/>Monolithic Architecture]

    subgraph Phase1["Phase 1: Enhancements"]
        Jobs[⏰ Background Jobs<br/>Bull/BullMQ]
        Storage[📁 File Storage<br/>S3/Cloudinary]
        Search[🔍 Search Engine<br/>Algolia/Typesense]
    end

    subgraph Phase2["Phase 2: Real-time"]
        WS[🔄 WebSockets]
        SSE[📡 Server-Sent Events]
        Redis[💾 Redis Cache]
    end

    subgraph Phase3["Phase 3: Distribution"]
        MQ[📨 Message Queue]
        Services[🔧 Microservices]
        EventBus[🚌 Event Bus]
    end

    Current --> Phase1
    Phase1 --> Phase2
    Phase2 --> Phase3

    style Current fill:#e3f2fd
    style Phase1 fill:#fff3e0
    style Phase2 fill:#f3e5f5
    style Phase3 fill:#e8f5e9
```

### 🛤️ Evolution Path

| Stage                   | Architecture      | When              | Benefits                 |
| ----------------------- | ----------------- | ----------------- | ------------------------ |
| **1️⃣ Current**          | Monolithic        | Now               | Simple, fast development |
| **2️⃣ Modular Monolith** | Organized modules | 10K+ users        | Better code organization |
| **3️⃣ Micro-frontends**  | Split web apps    | Multiple teams    | Independent deployments  |
| **4️⃣ Microservices**    | Split by domain   | 100K+ users       | Scale independently      |
| **5️⃣ Event-Driven**     | Message bus       | Complex workflows | Decoupled services       |

---

## 💡 Development Principles

### 🎯 Core Values

<table>
<tr>
<td valign="top" width="50%">

#### 🔒 Type Safety First

✅ **Benefits**

- TypeScript everywhere
- Catch bugs at compile time
- Self-documenting code
- Refactor with confidence

📝 **Implementation**

- Strict TypeScript config
- End-to-end type inference
- Zod schema validation
- tRPC type generation

</td>
<td valign="top" width="50%">

#### ⚡ Developer Experience

✅ **Benefits**

- Fast feedback loops
- Clear error messages
- Automated workflows
- Comprehensive docs

🛠️ **Tools**

- Hot Module Replacement (HMR)
- Biome for instant linting
- Turborepo for fast builds
- TypeScript for autocomplete

</td>
</tr>
<tr>
<td valign="top" width="50%">

#### ♻️ Code Reusability

✅ **Strategy**

- Shared packages
- Component library (46+ components)
- Utility functions
- Type definitions

📦 **Packages**

- `@repo/web-ui` - UI components
- `@repo/api` - API definitions
- `@repo/db` - Database schemas
- `@repo/validators` - Shared schemas

</td>
<td valign="top" width="50%">

#### 🚀 Performance by Default

✅ **Techniques**

- Lazy loading routes
- Automatic code splitting
- Optimized images
- Minimal bundle sizes

📊 **Monitoring**

- Lighthouse scores
- Web Vitals tracking
- Bundle size analysis
- Query performance

</td>
</tr>
</table>

---

<div align="center">

### 📚 Related Documentation

[🏠 Back to README](../README.md) • [🚀 Deployment Guide](DEPLOYMENT.md) • [🤝 Contributing](../CONTRIBUTING.md)

---

**Last Updated:** 2025-10-02

_Made with ❤️ by the Voltig Turbo team_

</div>
