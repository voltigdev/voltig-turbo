import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from '@repo/web-ui/components/sonner';
import { TooltipProvider } from '@repo/web-ui/components/tooltip';
import { ThemeProvider } from '@repo/web-ui/providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
  </ThemeProvider>
);