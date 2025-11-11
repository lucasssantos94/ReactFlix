import { useMediaInfo } from '@app/hooks/media/useMediaDetails'
import { formatCurrency } from '@app/utils/formatCurrency'
import { getOriginalLanguage } from '@app/utils/getOriginalLanguage'
import { translateStatus } from '@app/utils/translateStatus'
import { Link } from 'react-router'
import { ExternalIds } from '@/views/components/ExternalIds'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { Badge } from '@/views/components/ui/badge'
import { InfoCard } from './InfoCard'

export const SideBar = () => {
  const infoMedia = useMediaInfo()

  if (!infoMedia) return <LoadingSpinner />

  const {
    external_ids,
    homepage,
    original_title,
    status,
    original_language,
    budget,
    revenue,
    keywords,
    type,
  } = infoMedia

  return (
    <aside className='flex flex-col gap-5 pr-4'>
      <div className='p-5 rounded-lg border border-border flex items-center'>
        <ExternalIds
          externalIds={
            external_ids || {
              imdb_id: null,
              facebook_id: null,
              instagram_id: null,
              twitter_id: null,
            }
          }
          homepage={homepage || ''}
        />
      </div>
      <InfoCard title='Título original' value={original_title} />
      <InfoCard
        title='Situação'
        value={translateStatus(status || '')}
        valueClass='text-green-500'
      />
      <InfoCard
        title='Idioma original'
        value={getOriginalLanguage(original_language)}
        valueClass='capitalize'
      />
      {type === 'movie' && (
        <>
          <InfoCard
            title='Orçamento'
            value={budget ? formatCurrency(budget) : '-'}
          />
          <InfoCard
            title='Faturamento'
            value={revenue ? formatCurrency(revenue) : '-'}
          />
        </>
      )}

      <div className='p-5 rounded-lg border border-border'>
        <h2 className='text-lg font-semibold mb-2'>Palavras-Chave</h2>
        <div className='flex flex-wrap gap-2'>
          {keywords?.length > 0 ? (
            keywords.map((keyword: { id: number; name: string }) => (
              <Link
                key={keyword.id}
                to={
                  type === 'movie'
                    ? `/keyword/${keyword.id}/movies`
                    : `/keyword/${keyword.id}/series`
                }
              >
                <Badge className='text-white bg-gray-700'>{keyword.name}</Badge>
              </Link>
            ))
          ) : (
            <p className='text-muted-foreground'>Nenhuma palavra-chave.</p>
          )}
        </div>
      </div>
    </aside>
  )
}
