import { useGetSearch } from '@/app/hooks/media/useGetSearch'

export const useSearch = (query: string) => {
  const { searchData, isLoading, error } = useGetSearch(query || '')

  const movies = searchData?.filter(
    (item: { media_type: string }) => item.media_type === 'movie'
  )
  const series = searchData?.filter(
    (item: { media_type: string }) => item.media_type === 'tv'
  )
  const people = searchData?.filter(
    (item: { media_type: string }) => item.media_type === 'person'
  )

  return {
    searchData,
    movies,
    series,
    people,
    isLoading,
    error,
  }
}
