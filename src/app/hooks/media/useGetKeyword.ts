import { useQuery } from '@tanstack/react-query'

import { getKeyword } from '@/app/services/media/getKeyword'

export function useGetKeyword(keyword: number) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['keyword', keyword],
    queryFn: () => getKeyword(keyword),
  })

  return {
    keywordData: data,
    isLoading,
    error,
    isError,
  }
}
