import { getSearch } from '@app/services/media/getSearch'
import { useQuery } from '@tanstack/react-query'

export function useGetSearch(query: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getSearch(query),
  })

  return {
    searchData: data,
    isLoading,
    error,
  }
}
