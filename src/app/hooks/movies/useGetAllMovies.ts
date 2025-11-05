import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllMovies } from '@/app/services/movies/getAllMovies'

export const useGetAllMovies = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['all-movies'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getAllMovies(pageParam),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const isLastPage = allPages.length >= lastPage.total_pages
        if (isLastPage) return null
        return lastPageParam + 1
      },
    })

  const movies = data?.pages.flatMap(page => page.results)

  return {
    movies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
