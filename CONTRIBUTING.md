# Contributing to Voltig Turbo

Thank you for your interest in contributing to Voltig Turbo! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js >= 22.20.0
- pnpm >= 10.17.1
- Docker (for database)
- Git

### Setup

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/your-username/voltig-turbo.git
cd voltig-turbo
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up environment:

```bash
cp .env.example .env
cp .env.development.example .env.development
# Edit with your values
```

5. Start database and run migrations:

```bash
pnpm --filter server db:up
pnpm db:migrate:development
pnpm auth:generate:development
```

6. Start development servers:

```bash
pnpm dev
```

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Making Changes

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Run quality checks:

```bash
# Format and lint
pnpm check:fix

# Type check
pnpm typecheck

# Build (ensure no errors)
pnpm build
```

4. Commit your changes:

```bash
git add .
git commit -m "feat: add new feature"
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build process or tooling changes

**Examples:**

```bash
feat(auth): add OAuth support
fix(mobile): resolve navigation crash on Android
docs(readme): update setup instructions
refactor(api): simplify error handling
```

### Pull Request Process

1. Push your branch:

```bash
git push origin feature/your-feature-name
```

2. Create a Pull Request on GitHub

3. Fill out the PR template:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if UI changes)

4. Ensure CI passes:
   - Linting
   - Type checking
   - Build succeeds

5. Request review from maintainers

6. Address review feedback

7. Once approved, maintainers will merge

## Code Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- Avoid `any` types
- Export types alongside implementation

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

export function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
export function getUser(id: any): Promise<any> {
  // ...
}
```

### React

- Use functional components
- Use hooks over class components
- Extract reusable logic to custom hooks
- Memoize expensive computations

```typescript
// ✅ Good
export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = useUser(userId);

  if (isLoading) return <Loading />;
  return <div>{data.name}</div>;
}

// ❌ Bad
export class UserProfile extends React.Component {
  // ...
}
```

### Styling

- Use Tailwind CSS utility classes
- Use components from `@repo/ui`
- Follow mobile-first responsive design
- Support dark mode

```typescript
// ✅ Good
<div className="flex flex-col gap-4 md:flex-row dark:bg-gray-900">
  <Button variant="default">Submit</Button>
</div>

// ❌ Bad
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <button>Submit</button>
</div>
```

### API Design

- Use tRPC for type-safe APIs
- Validate inputs with Zod
- Use protected procedures for authenticated routes
- Return consistent error responses

```typescript
// ✅ Good
export const todoRouter = router({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(100),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(todo).values({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});

// ❌ Bad
export const todoRouter = router({
  create: publicProcedure
    .mutation(async ({ ctx, input }: any) => {
      return ctx.db.insert(todo).values(input);
    }),
});
```

## Testing

### Running Tests

```bash
# All tests
pnpm test

# Specific workspace
pnpm -F app test

# Watch mode
pnpm -F app test:watch
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## Database Changes

### Adding Migrations

1. Update schema in `packages/db/src/schema/`:

```typescript
export const newTable = pgTable('new_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});
```

2. Generate migration:

```bash
pnpm db:generate:development
```

3. Review generated SQL in `packages/db/drizzle/`

4. Test migration:

```bash
pnpm db:migrate:development
```

5. Commit both schema and migration files

## Documentation

### Code Documentation

- Document complex logic with comments
- Use JSDoc for public APIs
- Keep comments up-to-date

```typescript
/**
 * Calculates user reward points based on purchase amount
 * @param amount - Purchase amount in cents
 * @param userTier - User's membership tier
 * @returns Calculated reward points
 */
export function calculateRewards(
  amount: number,
  userTier: 'bronze' | 'silver' | 'gold'
): number {
  // Implementation
}
```

### README Updates

- Update READMEs when adding features
- Include usage examples
- Document breaking changes

## Performance

- Optimize images (use WebP, proper sizing)
- Code split large bundles
- Memoize expensive React components
- Use database indexes for queries
- Implement pagination for large datasets

## Security

- Never commit secrets or API keys
- Use environment variables for config
- Validate and sanitize all inputs
- Use parameterized queries (Drizzle handles this)
- Keep dependencies updated

## Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast
- Use Radix UI components (built-in a11y)

## Mobile Development

### React Native Best Practices

- Test on both iOS and Android
- Use NativeWind for consistent styling
- Handle platform differences gracefully
- Optimize images for mobile
- Test on various screen sizes

## Questions?

- Open a GitHub Discussion
- Join our community chat
- Check existing issues and PRs

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Voltig Turbo! 🚀
