import { useParams } from 'react-router'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import { MediaSearchedCard } from '@/views/components/MediaSearchedCard'
import { useSearch } from './useSearch'

const MovieSearch = () => {
  const { search } = useParams()
  const { movies } = useSearch(search || '')

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {movies.length > 0 ? (
          movies?.map((movie: IMovieDetails) => (
            <MediaSearchedCard key={movie.id} media={movie} />
          ))
        ) : (
          <p>Nenhum filme encontrado</p>
        )}
      </div>
    </div>
  )
}

export default MovieSearch
