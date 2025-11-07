import { useParams } from 'react-router'
import type { ISeriesDetails } from '@/app/types/SerieDetails'
import { MediaSearchedCard } from '@/views/components/MediaSearchedCard'
import { useSearch } from './useSearch'

const SerieSearch = () => {
  const { search } = useParams()
  const { series } = useSearch(search || '')

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {series.length > 0 ? (
          series?.map((serie: ISeriesDetails) => (
            <MediaSearchedCard key={serie.id} media={serie} />
          ))
        ) : (
          <p>Nenhuma série encontrada</p>
        )}
      </div>
    </div>
  )
}

export default SerieSearch
