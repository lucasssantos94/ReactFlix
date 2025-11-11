import { useParams } from 'react-router'
import { useGetSerieCast } from '@/app/hooks/media/useGetCast'
import { CastPage } from '@/views/layout/Castpage'

const SerieCast = () => {
  const { serieId } = useParams()
  const { castSerie, isLoading, isError } = useGetSerieCast(serieId || '')

  return (
    <CastPage
      isLoading={isLoading}
      isError={isError}
      castData={castSerie || null}
    />
  )
}

export default SerieCast
