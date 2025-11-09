import { useQuery } from '@tanstack/react-query'
import { getMediaTrailer } from '@/app/services/media/getMediaTrailer'
import type { TMDBVideo } from '@/app/types/TMDBVideo'

export function useGetMediaTrailer(id?: number, mediaType?: 'movie' | 'tv') {
  const { data, isLoading, refetch, isFetching, error } =
    useQuery<TMDBVideo | null>({
      queryKey: ['media-trailer', id, mediaType],
      queryFn: () => {
        if (!id || !mediaType) {
          console.warn('ID ou tipo de mídia não fornecidos')
          return null
        }
        return getMediaTrailer(id, mediaType)
      },
      enabled: !!id && !!mediaType,
    })

  return {
    trailer: data,
    isLoading,
    refetch,
    isFetching,
    error,
  }
}
