import { getSerieDetails } from '@app/services/series/getSerieDetails'
import type { ISeriesDetails } from '@app/types/SerieDetails'
import { useQuery } from '@tanstack/react-query'

export const useGetSeriesDetails = (serieId: string) => {
  const { data, isLoading, refetch, isFetching, error } =
    useQuery<ISeriesDetails>({
      staleTime: Infinity,
      queryKey: ['serie-details', serieId],
      queryFn: () => getSerieDetails(serieId),
      enabled: !!serieId,
    })

  return {
    serieDetails: data,
    isLoading,
    refetch,
    isFetching,
    error,
  }
}
