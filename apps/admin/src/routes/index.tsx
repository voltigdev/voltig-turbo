import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@repo/web-ui/components/button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <Button variant="outline" size="lg">Click me</Button>
    </div>
  )
}
