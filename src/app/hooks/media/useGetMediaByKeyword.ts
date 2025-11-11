import { useInfiniteQuery } from '@tanstack/react-query'
import {
  getMovieByKeyword,
  getSerieByKeyword,
} from '@/app/services/media/getMediaByKeyword'

export function useGetMovieByKeyword(keyword: string) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies-by-keyword', keyword],
    queryFn: ({ pageParam = 1 }) => getMovieByKeyword(keyword, pageParam),
    getNextPageParam: lastPage => {
      const nextPage = lastPage.page + 1
      return nextPage <= lastPage.total_pages ? nextPage : null
    },
  })

  const mediaByKeyword = data?.pages.flatMap(page => page.results) || []
  const totalResults = data?.pages[0]?.total_results || 0

  return {
    data,
    mediaByKeyword,
    totalResults,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
  }
}

export function useGetSerieByKeyword(keyword: string) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['series-by-keyword', keyword],
    queryFn: ({ pageParam = 1 }) => getSerieByKeyword(keyword, pageParam),
    getNextPageParam: lastPage => {
      const nextPage = lastPage.page + 1
      return nextPage <= lastPage.total_pages ? nextPage : null
    },
  })

  const mediaByKeyword = data?.pages.flatMap(page => page.results) || []
  const totalResults = data?.pages[0]?.total_results || 0

  return {
    data,
    mediaByKeyword,
    totalResults,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
  }
}
