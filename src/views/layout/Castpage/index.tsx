import { CreditPersonCard } from '@views/components/CreditPersonCard'
import { Skeleton } from '@views/components/ui/skeleton'
import type { ICredits } from '@/app/types/MediaBase'
import { ContainerGrid } from '@/views/components/ContainerGrid'

interface CastPageProps {
  castData: ICredits | null
  isLoading: boolean
  isError: boolean
}

export const CastPage = ({ isLoading, isError, castData }: CastPageProps) => {
  if (isError) {
    return <div>Erro ao carregar elenco</div>
  }

  return (
    <section className='min-h-screen py-8'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            Elenco e Equipe Técnica
          </h1>
        </div>

        {isLoading && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {Array.from({ length: 12 }).map(() => (
              <div key={Math.random()} className='flex flex-col gap-2'>
                <Skeleton className='w-full aspect-2/3 rounded-lg' />
                <Skeleton className='w-3/4 h-4 mx-auto' />
                <Skeleton className='w-1/2 h-3 mx-auto' />
              </div>
            ))}
          </div>
        )}

        {!isLoading && castData && (
          <>
            <div className='mb-12'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700'>
                Elenco Principal
              </h2>

              {castData.cast && castData.cast.length > 0 ? (
                <ContainerGrid>
                  {castData.cast.map(person => (
                    <div key={person.id} className='text-center'>
                      <CreditPersonCard
                        credit={{
                          id: person.id,
                          name: person.name,
                          poster_path: person.profile_path,
                          media_type: 'movie',
                          character: person.character,
                        }}
                      />
                    </div>
                  ))}
                </ContainerGrid>
              ) : (
                <p className='text-gray-500 dark:text-gray-400 text-center py-8'>
                  Nenhum membro do elenco encontrado.
                </p>
              )}
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700'>
                Equipe Técnica
              </h2>
              {castData.crew && castData.crew.length > 0 ? (
                <ContainerGrid>
                  {castData.crew.map(person => (
                    <CreditPersonCard
                      key={person.id + person.job}
                      credit={{
                        id: person.id,
                        name: person.name,
                        poster_path: person.profile_path,
                        media_type: 'movie',
                        job: person.job,
                      }}
                    />
                  ))}
                </ContainerGrid>
              ) : (
                <p className='text-gray-500 dark:text-gray-400 text-center py-8'>
                  Nenhum membro da equipe técnica encontrado.
                </p>
              )}
            </div>
          </>
        )}

        {!isLoading && (!castData || castData.cast.length === 0) && (
          <div className='text-center py-12'>
            <div className='text-gray-400 dark:text-gray-500 text-6xl mb-4'>
              🎭
            </div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              Elenco não disponível
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              As informações do elenco não estão disponíveis no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
