import { Dashboard } from '@/components/dashboard/dashboard'
import { LanguageProvider } from '@/lib/language-context'

export default function Page() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  )
}

