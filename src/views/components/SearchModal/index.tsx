import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Search, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useGetTrendingWeekMovies } from '@/app/hooks/movies/useGetTrendingWeekMovies'
import { useModalSearchStore } from '@/app/stores/useModalSearchStore'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Input } from '../ui/input'

export const SearchModal = () => {
  const [search, setSearch] = useState('')

  const location = useLocation()
  const { isOpen, closeModal } = useModalSearchStore()
  const { trendingWeekMovies, isLoading, isError } = useGetTrendingWeekMovies()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/search/${search}`)
  }

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
        <form onSubmit={handleSubmit} className='mt-8 flex items-center gap-2'>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Pesquise por filmes, series ou pessoas'
          />
          <Button type='submit' className='cursor-pointer'>
            Buscar
          </Button>
        </form>
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
