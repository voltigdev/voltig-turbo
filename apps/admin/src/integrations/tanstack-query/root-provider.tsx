import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DesignSystemProvider } from '@repo/web-ui/providers'
import React from 'react'

export function getContext() {
  const queryClient = new QueryClient()
  return {
    queryClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}><DesignSystemProvider>{children}</DesignSystemProvider></QueryClientProvider>
  )
}
