import { useMediaInfo } from '@app/hooks/media/useMediaDetails'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Carousel } from '@/views/components/Carousel'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { PersonCard } from '@/views/components/PersonCard'
import { RecommendationCard } from '@/views/components/RecommendationCard'

export const SectionInfo = () => {
  const mediaInfo = useMediaInfo()

  if (!mediaInfo) return <LoadingSpinner />

  const { cast, reviews, recommendations, title, id, type } = mediaInfo

  return (
    <section className='md:pr-14 md:border-r-4 border-border pt-4 px-2'>
      {/* Elenco */}
      {cast?.length ? (
        <div className=''>
          <h2 className='text-3xl font-bold md:mb-4'>Elenco principal</h2>
          <Carousel
            loop={false}
            data={cast.slice(0, 9)}
            keyExtractor={item => item.id}
            carouselItem={
              <Link
                to={
                  type === 'movie' ? `/movies/${id}/cast` : `/series/${id}/cast`
                }
                className='flex items-center w-60 ml-3 p-2'
              >
                <span className='text-md font-bold text-[#ccc]'>Ver todos</span>
                <ArrowRight className='text-[#ccc]' />
              </Link>
            }
            renderItem={item => <PersonCard member={item} />}
          />

          <div className='border-b-2 py-4'>
            <Link
              to={
                type === 'movie' ? `/movies/${id}/cast` : `/series/${id}/cast`
              }
              className='flex items-center '
            >
              <h4 className='font-semibold text-lg'>
                Elenco e equipe técnica completos
              </h4>
            </Link>
          </div>
        </div>
      ) : (
        <p className='text-muted-foreground'>Sem elenco listado.</p>
      )}

      {/* Avaliações */}
      <h2 className='text-3xl font-bold mb-6 mt-10'>Avaliações</h2>
      {reviews && reviews?.length > 0 ? (
        <div>
          {reviews.map(review => (
            <div
              key={review.id}
              className='mb-6 p-4 rounded-lg border border-border'
            >
              <h3 className='text-lg font-bold mb-1'>{review.author}</h3>
              <p className='text-sm text-muted-foreground mb-2'>
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString('pt-BR')
                  : ''}
              </p>
              <p className='text-muted-foreground'>
                {review.content && review.content.length > 300
                  ? `${review.content.slice(0, 300)}...`
                  : review.content || ''}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className='mb-6 p-4 rounded-lg border border-border'>
          <p className='text-muted-foreground'>{`Nenhuma avaliação encontrada para  "${title}".`}</p>
        </div>
      )}

      {/* Recomendações */}
      {recommendations && recommendations?.length > 0 && (
        <div className='mt-10'>
          <h2 className='text-3xl font-bold mb-6'>Recomendações</h2>
          <Carousel
            data={recommendations}
            keyExtractor={item => item.id}
            itemClass='basis-1/1 sm:basis-1/1 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4'
            renderItem={item => <RecommendationCard media={item} />}
          />
        </div>
      )}
    </section>
  )
}
