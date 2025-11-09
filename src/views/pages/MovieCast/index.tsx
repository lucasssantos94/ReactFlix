import { useParams } from 'react-router'
import { CastPage } from '@/views/layout/Castpage'

const MovieCast = () => {
  const { movieId } = useParams()
  return <CastPage type='movie' id={movieId || ''} />
}
export default MovieCast
