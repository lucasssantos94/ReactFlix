import { ThemeProvider } from '@app/contexts/ThemeProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header } from '@views/components/Header'
import { LoadingSpinner } from '@views/components/LoadingSpinner'
import ScrollToTop from '@views/components/ScrollToTop'
import { TrailerModal } from '@views/components/TrailerModal'
import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router'
import { QueryProvider } from './app/contexts/QueryProvider'
import { useCtrlKShortcut } from './app/stores/useModalSearchStore'
import { Footer } from './views/components/Footer'
import { SearchModal } from './views/components/SearchModal/'

const App = () => {
  const { setupCtrlKListener } = useCtrlKShortcut()

  useEffect(() => {
    const cleanup = setupCtrlKListener()
    return cleanup
  }, [setupCtrlKListener])

  return (
    <QueryProvider>
      <ThemeProvider>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1 pb-10'>
            <ScrollToTop />
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
          <TrailerModal />
          <SearchModal />
        </div>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  )
}

export default App
