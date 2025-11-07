import { useGetAllSeries } from '@/app/hooks/series/useGetAllSeries'
import { useGetSeriesGenres } from '@/app/hooks/series/useGetSeriesGenres'
import type { ISeriesDetails } from '@/app/types/SerieDetails'
import { MediaListPage } from '@/views/layout/MediaPage/'

export default function Series() {
  return (
    <MediaListPage<ISeriesDetails>
      title='Séries'
      useGetAllMedia={(genreId: string) => {
        const {
          series,
          isLoading,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        } = useGetAllSeries(genreId)
        return {
          data: series,
          isLoading,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        }
      }}
      useGetGenres={() => {
        const { seriesGenres } = useGetSeriesGenres()
        return { data: seriesGenres }
      }}
    />
  )
}
