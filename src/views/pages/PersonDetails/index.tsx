import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useGetPersonDetails } from '@/app/hooks/people/useGetPersonDetails'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { Carousel } from '@/views/components/Carousel'
import { CreditCard } from '@/views/components/CreditCard'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { MediaImage } from '@/views/components/MediaImage'
import { Badge } from '@/views/components/ui/badge'
import { Button } from '@/views/components/ui/button'

const PersonDetails = () => {
  const { personId } = useParams()
  const { personDetails, isLoading, error } = useGetPersonDetails(
    personId || ''
  )
  const [showFullBiography, setShowFullBiography] = useState(false)

  if (isLoading) return <LoadingSpinner />

  if (error || !personDetails) {
    return (
      <div className='text-center py-16'>
        <p className='text-red-500 text-lg'>
          Erro ao carregar dados da pessoa.
        </p>
        <Button onClick={() => window.location.reload()} className='mt-4'>
          Tentar novamente
        </Button>
      </div>
    )
  }

  const { details, credits } = personDetails

  const calculateAge = (birthDate: Date, deathDate: Date | null): number => {
    const endDate = deathDate || new Date()
    let age = endDate.getFullYear() - birthDate.getFullYear()
    const monthDiff = endDate.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && endDate.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  const getDateInfo = () => {
    if (!details.birthday) return null

    try {
      const birthDate = new Date(details.birthday)
      const deathDate = details.deathday ? new Date(details.deathday) : null

      const age = calculateAge(birthDate, deathDate)

      return {
        birthDate: birthDate.toLocaleDateString('pt-BR'),
        deathDate: deathDate ? deathDate.toLocaleDateString('pt-BR') : null,
        age,
        isDeceased: !!details.deathday,
      }
    } catch (error) {
      console.error('Erro ao processar datas:', error)
      return null
    }
  }

  const dateInfo = getDateInfo()

  const processPersonData = () => {
    const knownFor = credits.cast
      .filter(item => item.poster_path)
      .sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || 0)
        const dateB = new Date(b.release_date || b.first_air_date || 0)
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, 7)
      .map(item => ({
        id: item.id,
        title: item.title || item.name || 'Título não disponível',
        poster_path: item.poster_path,
        media_type: item.media_type,
      }))

    const totalCredits = credits.cast.length + credits.crew.length

    const actingCredits = credits.cast
      .filter(credit => credit.character)
      .reduce(
        (acc, credit) => {
          const title = credit.title || credit.name
          const existing = acc.find(item => item.title === title)
          if (!existing && title) {
            acc.push({
              media_type: credit.media_type,
              id: credit.id,
              title: title,
              character: credit.character,
              year:
                credit.release_date?.split('-')[0] ||
                credit.first_air_date?.split('-')[0] ||
                'N/A',
            })
          }
          return acc
        },
        [] as Array<{
          id: number
          title: string
          character: string
          year: string
          media_type: 'movie' | 'tv'
        }>
      )
      .sort((a, b) => b.year.localeCompare(a.year))

    const upcomingCredits = credits.cast
      .filter(credit => {
        const releaseDate = credit.release_date || credit.first_air_date
        if (!releaseDate) return false
        return new Date(releaseDate) > new Date()
      })
      .map(credit => ({
        id: credit.id,
        title: credit.title || credit.name || 'Título não disponível',
        character: credit.character,
        media_type: credit.media_type,
        year:
          credit.release_date?.split('-')[0] ||
          credit.first_air_date?.split('-')[0] ||
          'N/A',
      }))

    return {
      knownFor,
      totalCredits,
      actingCredits,
      upcomingCredits,
    }
  }

  console.log(processPersonData().knownFor)

  const processedData = processPersonData()

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Header com foto e informações básicas */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12'>
        {/* Foto */}
        <div className='lg:col-span-1'>
          <div className='rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700 aspect-3/4'>
            <MediaImage
              src={getImageUrl({
                path: details.profile_path,
                size: 'POSTER_SMALL',
              })}
              alt={details.name}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        {/* Informações principais */}
        <div className='lg:col-span-3'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            {details.name}
          </h1>

          {/* Status (se falecido) */}
          {dateInfo?.isDeceased && (
            <div className='mb-4'>
              <span className='inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium'>
                <span className='w-2 h-2 bg-gray-400 rounded-full mr-2'></span>
                Falecido(a)
              </span>
            </div>
          )}

          {/* Também conhecido como */}
          {details.also_known_as && details.also_known_as.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2'>
                Também conhecido(a) como
              </h3>
              <div className='flex flex-wrap gap-2'>
                {details.also_known_as.slice(0, 3).map(name => (
                  <span
                    key={name}
                    className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm'
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Informações pessoais */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='space-y-3'>
              <div>
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Conhecido(a) por
                </h3>
                <p className='text-lg text-gray-900 dark:text-white'>
                  {details.known_for_department}
                </p>
              </div>

              <div>
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                  Gênero
                </h3>
                <p className='text-lg text-gray-900 dark:text-white'>
                  {details.gender === 1
                    ? 'Feminino'
                    : details.gender === 2
                      ? 'Masculino'
                      : 'Não informado'}
                </p>
              </div>
            </div>

            <div className='space-y-3'>
              {/* Data de nascimento */}
              {details.birthday && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                    Nascimento
                  </h3>
                  <p className='text-lg text-gray-900 dark:text-white'>
                    {new Date(details.birthday).toLocaleDateString('pt-BR')}
                  </p>
                  {dateInfo && (
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      {dateInfo.isDeceased
                        ? `Faleceu com ${dateInfo.age} anos`
                        : `${dateInfo.age} anos`}
                    </p>
                  )}
                </div>
              )}

              {/* Data de falecimento */}
              {details.deathday && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                    Falecimento
                  </h3>
                  <p className='text-lg text-gray-900 dark:text-white'>
                    {new Date(details.deathday).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}

              {details.place_of_birth && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
                    Local de nascimento
                  </h3>
                  <p className='text-lg text-gray-900 dark:text-white'>
                    {details.place_of_birth}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Estatística de créditos */}
        </div>
        <div className='bg-linear-to-r from-red-400 to-red-500 rounded-2xl p-6 text-white text-center col-span-full'>
          <h3 className='text-lg font-semibold mb-2'>Creditado(a) em</h3>
          <p className='text-5xl font-bold mb-1'>
            {processedData.totalCredits}
          </p>
          <p className='text-red-100'>projetos no total</p>
        </div>
      </div>

      {/* Biografia */}
      {details.biography && (
        <section className='mb-12'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
              Biografia
            </h2>
          </div>

          <div className='prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed'>
            {showFullBiography ? (
              details.biography.split('\n\n').map(paragraph => (
                <p key={Math.random()} className='mb-4 text-lg'>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className='text-lg'>
                {details.biography.split('\n\n')[0].substring(0, 400)}...
              </p>
            )}

            {details.biography.length > 400 && (
              <Button
                onClick={() => setShowFullBiography(!showFullBiography)}
                variant='outline'
                className='mt-4'
              >
                {showFullBiography ? 'Ler menos' : 'Ler mais'}
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Conhecido por - Grid de posters */}
      <section className='mb-12'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
          Conhecido(a) por
        </h2>

        <Carousel
          loop={false}
          data={processedData.knownFor}
          keyExtractor={item => item.id}
          renderItem={item => <CreditCard credit={item} />}
        />
      </section>

      {/* Trabalhos recentes e futuros */}
      {processedData.upcomingCredits.length > 0 && (
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
            Próximos Trabalhos
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {processedData.upcomingCredits.slice(0, 3).map(credit => (
              <Link
                to={`/movies/${credit.id}`}
                key={credit.id}
                className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'
              >
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                  {credit.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-1'>
                  {credit.character}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {credit.year}
                  </span>
                  <span className='px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full font-medium'>
                    Em breve
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Atuação - Lista de trabalhos */}
      <section className='mb-12'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Atuação
          </h2>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {processedData.actingCredits.length} trabalhos
          </span>
        </div>

        <div className='space-y-4'>
          {processedData.actingCredits.map((credit, index) => (
            <Link
              to={
                credit.media_type === 'movie'
                  ? `/movies/${credit.id}`
                  : `/series/${credit.id}`
              }
              key={`${credit.id}-${index}`}
              className='flex items-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 group'
            >
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white transition-colors line-clamp-1'>
                    {credit.title}
                  </h3>
                  <Badge>
                    {credit.media_type === 'movie' ? 'Filme' : 'Série'}
                  </Badge>
                </div>

                <p className='text-gray-600 dark:text-gray-400 mt-1 line-clamp-1'>
                  {credit.character}
                </p>
              </div>

              <div className='flex items-center space-x-4 ml-6'>
                <span className='text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap'>
                  {credit.year}
                </span>
                <div className='w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full'></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PersonDetails
