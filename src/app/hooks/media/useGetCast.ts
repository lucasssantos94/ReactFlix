import { getCastMovie, getCastSerie } from '@app/services/media/getCast'
import { useQuery } from '@tanstack/react-query'

export function useGetMovieCast(mediaId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movie-cast', mediaId],
    queryFn: () => getCastMovie(mediaId),
  })

  return {
    castMovie: data,
    isLoading,
    error,
  }
}

export function useGetSerieCast(mediaId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['serie-cast', mediaId],
    queryFn: () => getCastSerie(mediaId),
  })

  return {
    castSerie: data,
    isLoading,
    error,
  }
}
