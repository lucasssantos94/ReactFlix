import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllMovies } from '@/app/services/movies/getAllMovies'

export const useGetAllMovies = (selectedGenreId?: string) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', selectedGenreId],
    queryFn: ({ pageParam }) => getAllMovies(pageParam, selectedGenreId),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const isLastPage = allPages.length >= lastPage.total_pages
      if (isLastPage) return null
      return lastPageParam + 1
    },
  })

  const movies = data?.pages.flatMap(page => page.results) || []

  return {
    movies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  }
}
