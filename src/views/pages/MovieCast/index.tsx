import { useParams } from 'react-router'
import { useGetMovieCast } from '@/app/hooks/media/useGetCast'
import { CastPage } from '@/views/layout/Castpage'

const MovieCast = () => {
  const { movieId } = useParams()
  const { castMovie, isLoading, isError } = useGetMovieCast(movieId || '')
  return (
    <CastPage
      isLoading={isLoading}
      isError={isError}
      castData={castMovie || null}
    />
  )
}
export default MovieCast
