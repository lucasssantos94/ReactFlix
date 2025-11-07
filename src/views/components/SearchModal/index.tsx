import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Search, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { useGetTrendingWeekMovies } from '@/app/hooks/movies/useGetTrendingWeekMovies'
import { useModalSearchStore } from '@/app/stores/useModalSearchStore'
import { SearchForm } from '../SearchForm'
import { Dialog, DialogContent } from '../ui/dialog'

export const SearchModal = () => {
  const location = useLocation()
  const { isOpen, closeModal } = useModalSearchStore()
  const { trendingWeekMovies, isLoading, isError } = useGetTrendingWeekMovies()

  useEffect(() => {
    closeModal()
  }, [location.pathname])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeModal}
      aria-label='Modal de pesquisa'
    >
      <DialogContent>
        <DialogTitle className='sr-only'>Pesquisar</DialogTitle>
        <DialogDescription className='sr-only'>
          Pesquise por filmes, series ou pessoas
        </DialogDescription>

        <SearchForm />

        <div>
          <h4 className='flex items-center gap-2 text-lg border-b-2 py-2'>
            <TrendingUp />
            Em Destaque
          </h4>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Error</p>}

          <div className='mt-2 flex flex-col'>
            {trendingWeekMovies?.slice(0, 10)?.map(movie => (
              <Link
                key={movie.id}
                className='border-b-2 py-2 hover:bg-foreground/10 flex items-center gap-2'
                to={`/movies/${movie.id}`}
              >
                <Search size={12} />
                {movie.title}
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
