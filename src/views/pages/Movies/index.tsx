import { useGetAllMovies } from '@/app/hooks/movies/useGetAllMovies'
import { useGetMoviesGenres } from '@/app/hooks/movies/useGetMoviesGenres'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import { MediaListPage } from '@/views/layout/MediaPage/'

export default function Movies() {
  return (
    <MediaListPage<IMovieDetails>
      title='Filmes'
      useGetAllMedia={genreId => {
        const {
          movies,
          isLoading,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        } = useGetAllMovies(genreId)
        return {
          data: movies,
          isLoading,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        }
      }}
      useGetGenres={() => {
        const { moviesGenres } = useGetMoviesGenres()
        return { data: moviesGenres }
      }}
    />
  )
}
