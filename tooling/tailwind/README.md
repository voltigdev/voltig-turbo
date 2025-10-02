# @repo/tailwind-config

Shared Tailwind CSS v4 configuration for the monorepo.

## Usage

### In Next.js apps

1. Install the package as a dependency:

```json
{
  "dependencies": {
    "@repo/tailwind-config": "workspace:*"
  },
  "devDependencies": {
    "postcss": "catalog:",
    "tailwindcss": "catalog:"
  }
}
```

2. Create a `postcss.config.js` in your app root:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

3. Import the styles in your root layout or `_app.tsx`:

```tsx
import "@repo/tailwind-config/styles";
```

4. Configure your `tailwind.config.ts` (optional, for custom content paths):

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
} satisfies Config;
```

## What's included

- **Tailwind CSS v4** - The latest version with CSS-first configuration
- **@tailwindcss/postcss** - PostCSS plugin for Tailwind v4
- **tw-animate-css** - Additional animation utilities

## Customization

To customize the theme, edit `styles.css` and use the `@theme` directive:

```css
@theme {
  --color-primary: #3b82f6;
  --font-family-display: "Inter", sans-serif;
}
```

For more information, see the [Tailwind CSS v4 documentation](https://tailwindcss.com/docs).
