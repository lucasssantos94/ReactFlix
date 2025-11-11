import { getCastMovie, getCastSerie } from '@app/services/media/getCast'
import { useQuery } from '@tanstack/react-query'
import type { ICredits } from '@/app/types/MediaBase'

export function useGetMovieCast(mediaId: string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['movie-cast', mediaId],
    queryFn: () => getCastMovie(mediaId),
  })

  return {
    castMovie: data,
    isLoading,
    error,
    isError,
  }
}

export function useGetSerieCast(mediaId: string) {
  const { data, isLoading, error, isError } = useQuery<ICredits>({
    queryKey: ['serie-cast', mediaId],
    queryFn: () => getCastSerie(mediaId),
  })

  return {
    castSerie: data,
    isLoading,
    error,
    isError,
  }
}
