import { getAllSeries } from '@app/services/series/getAllSeries'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetAllSeries = (selectedGenreId?: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['series', selectedGenreId],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getAllSeries(pageParam, selectedGenreId),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const isLastPage = allPages.length >= lastPage.total_pages
        if (isLastPage) return null
        return lastPageParam + 1
      },
    })

  const series = data?.pages.flatMap(page => page.results) || []

  return {
    series,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
