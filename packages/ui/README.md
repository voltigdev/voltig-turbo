# @repo/ui

Shared React component library for Voltig Turbo web applications.

## Overview

46+ accessible, customizable UI components built with Radix UI and Tailwind CSS, following shadcn/ui patterns.

## Components

### Layout & Navigation
- Accordion
- Breadcrumb
- Menubar
- Sidebar
- Tabs
- Collapsible
- Resizable

### Forms & Inputs
- Button
- Input
- Input OTP
- Checkbox
- Radio Group
- Select
- Switch
- Slider
- Form (React Hook Form integration)
- Label

### Feedback
- Alert Dialog
- Dialog
- Drawer
- Sheet
- Toast (Sonner)
- Hover Card
- Tooltip
- Popover

### Data Display
- Avatar
- Badge
- Card
- Table
- Calendar
- Chart (Recharts)
- Progress
- Separator
- Aspect Ratio
- Scroll Area

### Overlays
- Command
- Context Menu
- Dropdown Menu

### Utilities
- Toggle
- Toggle Group
- Carousel

## Usage

```typescript
import { Button, Card, Input } from '@repo/ui';

export function LoginForm() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Card>
  );
}
```

## Form Example

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@repo/ui';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Dark Mode

Components support dark mode via `next-themes`:

```typescript
import { useTheme } from 'next-themes';
import { Button } from '@repo/ui';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  );
}
```

## Customization

### Variants

Components use `class-variance-authority` (CVA):

```typescript
import { Button } from '@repo/ui';

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Custom Styles

```typescript
import { Button, cn } from '@repo/ui';

<Button className={cn('custom-class', 'hover:bg-blue-600')}>
  Custom Button
</Button>
```

## Adding Components

From web app directories:

```bash
pnpm ui-add
```

Select components to add from shadcn/ui catalog.

## Dependencies

- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **date-fns**: Date utilities
- **lucide-react**: Icons
- **next-themes**: Dark mode
- **Recharts**: Charts and data visualization
- **Sonner**: Toast notifications
- **CVA**: Component variants

## Icon Usage

```typescript
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@repo/ui';

<Button>
  <Check className="w-4 h-4 mr-2" />
  Success
</Button>

<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Loading...
</Button>
```

## Toast Notifications

```typescript
import { toast } from 'sonner';

// Success
toast.success('Profile updated!');

// Error
toast.error('Something went wrong');

// Custom
toast('Event created', {
  description: 'Your event has been created successfully.',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
});
```

## Charts

```typescript
import { Chart, ChartConfig } from '@repo/ui';
import { Bar, BarChart } from 'recharts';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function RevenueChart({ data }) {
  return (
    <Chart config={chartConfig}>
      <BarChart data={data}>
        <Bar dataKey="revenue" fill="var(--color-revenue)" />
      </BarChart>
    </Chart>
  );
}
```

## TypeScript

All components are fully typed:

```typescript
import type { ButtonProps } from '@repo/ui';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Related

- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
