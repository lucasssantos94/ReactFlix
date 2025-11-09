import { useParams } from 'react-router'
import { CastPage } from '@/views/layout/Castpage'

const SerieCast = () => {
  const { serieId } = useParams()
  return <CastPage type='serie' id={serieId || ''} />
}

export default SerieCast
