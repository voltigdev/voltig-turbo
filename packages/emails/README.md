# @repo/emails

Email templates for Voltig Turbo using React Email.

## Overview

Responsive email templates built with React Email and styled with Tailwind CSS.

## Templates

- `verification-email.tsx` - Email verification
- `otp-email.tsx` - One-time password authentication

## Usage

```typescript
import { VerificationEmail } from '@repo/emails';
import { render } from '@react-email/render';

const html = await render(
  <VerificationEmail
    verificationLink="https://example.com/verify?token=123"
  />
);

// Send via email service (Resend, SendGrid, etc.)
```

## Development

Preview emails:

```bash
# From monorepo root
pnpm -F @repo/emails dev

# Or from this directory
pnpm dev
```

Visit `http://localhost:3004`

## Creating Templates

```tsx
// src/welcome-email.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  actionUrl: string;
}

export function WelcomeEmail({ name, actionUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-100">
        <Container className="bg-white p-8 rounded-lg">
          <Text className="text-2xl font-bold">
            Welcome, {name}!
          </Text>
          <Text className="text-gray-600">
            Thanks for joining Voltig Turbo.
          </Text>
          <Button
            href={actionUrl}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

## Export Templates

```bash
pnpm export
```

Exports HTML files to `out/` directory.

## Related

- [React Email Docs](https://react.email)
- [Resend](https://resend.com)
