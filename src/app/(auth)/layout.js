import { AuthLayout } from '@/components/AuthLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function Layout ({ children }) {
  return (
    <ProtectedRoute isProtected={false}>
      <AuthLayout>{children}</AuthLayout>
    </ProtectedRoute>
  )
}
