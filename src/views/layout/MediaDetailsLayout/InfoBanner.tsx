import { useMediaInfo } from '@app/hooks/media/useMediaDetails'
import { convertMinutesInHour } from '@app/utils/convertMinutesinHour'
import { Asterisk, Play } from 'lucide-react'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useTrailerStore } from '@/app/stores/useTrailerStore'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { MediaImage } from '@/views/components/MediaImage'
import { Button } from '@/views/components/ui/button'

export const InfoBanner = () => {
  const mediaInfo = useMediaInfo()
  const { openModal } = useTrailerStore()
  const mobile = useIsMobile()

  if (!mediaInfo) return <LoadingSpinner />

  const {
    id,
    title,
    poster_path,
    date,
    director,
    writers,
    createdBy,
    runTime,
    brazilProvidersFlatrate,
    overview,
    genres,
    tagline,
    type,
  } = mediaInfo

  return (
    <div className='w-full md:container md:mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6 overflow-hidden'>
      {/* Poster */}
      <div className='w-full hidden md:block md:w-[300px] max-w-[70%] md:max-w-none mx-auto md:mx-0 aspect-2/3 shrink-0'>
        <MediaImage
          src={getImageUrl({ path: poster_path, size: 'POSTER_SMALL' })}
          alt={title || 'Capa do filme'}
          containerClassName={`${
            brazilProvidersFlatrate &&
            'provider_name' in brazilProvidersFlatrate
              ? 'rounded-t-2xl'
              : 'rounded-2xl'
          } w-full h-full shadow-lg overflow-hidden`}
          fallbackMessage='Foto não disponível'
        />

        {brazilProvidersFlatrate &&
          'provider_name' in brazilProvidersFlatrate && (
            <div className='flex items-center justify-center gap-2 bg-gray-900 rounded-b-2xl py-2'>
              <img
                src={getImageUrl({
                  path: brazilProvidersFlatrate.logo_path,
                  size: 'W92',
                })}
                alt={brazilProvidersFlatrate.provider_name}
                title={brazilProvidersFlatrate.provider_name}
                className='w-8 h-8 object-contain'
              />
              <span className='text-white text-sm leading-tight'>
                <h3 className='text-green-500/90 text-xs'>No Ar</h3>
                <h4 className='text-lg'>Assista agora</h4>
              </span>
            </div>
          )}
      </div>

      {/* Conteúdo */}
      <section className='flex-1'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 text-white mt-6'>
          {title}
        </h1>

        <div className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-gray-200 mb-4'>
          <time>
            {date ? Intl.DateTimeFormat('pt-BR').format(new Date(date)) : 'N/A'}
          </time>
          {!mobile && <Asterisk size={14} />}
          <span>{genres.map((g: { name: string }) => g.name).join(' • ')}</span>
          {type === 'movie' && (
            <>
              {!mobile && <Asterisk size={14} />}
              <span>{convertMinutesInHour(Number(runTime) || 0)}</span>
            </>
          )}
        </div>

        <Button
          size='sm'
          onClick={() => openModal(id || 0)}
          className='bg-white text-black hover:bg-white/90 font-bold gap-2 cursor-pointer mb-4 w-full sm:w-auto'
        >
          <Play className='h-4 w-4 md:h-5 md:w-5 fill-current' />
          Trailer
        </Button>

        {tagline && (
          <p className='italic text-gray-200 mb-3 md:mb-4 text-sm md:text-base'>
            "{tagline}"
          </p>
        )}

        {overview ? (
          <>
            <h2 className='text-lg md:text-2xl font-semibold mb-2 text-white'>
              Sinopse
            </h2>
            <p className='text-gray-200 leading-relaxed text-sm md:text-base overflow-y-auto md:overflow-visible scrollbar-none max-h-[100px] md:max-h-none'>
              {overview}
            </p>
          </>
        ) : (
          <p className='text-gray-200 leading-relaxed text-sm md:text-base overflow-y-auto md:overflow-visible scrollbar-none max-h-[100px] md:max-h-none'>
            sinopse não disponível
          </p>
        )}

        <div className='flex flex-col sm:flex-row flex-wrap items-start gap-4 mt-6 md:mt-8 text-white'>
          {type === 'movie' && (
            <>
              {director && (
                <div>
                  <h3 className='font-semibold text-base md:text-xl'>
                    {director.name}
                  </h3>
                  <p className='text-muted-foreground'>Diretor</p>
                </div>
              )}
              {(writers ?? []).length > 0 && (
                <div>
                  <h3 className='font-semibold text-base md:text-xl'>
                    {(writers ?? [])
                      .map((w: { name: string }) => w.name)
                      .join(', ')}
                  </h3>
                  <p className='text-muted-foreground'>
                    {(writers ?? []).length > 1 ? 'Roteiristas' : 'Roteirista'}
                  </p>
                </div>
              )}
            </>
          )}

          {type === 'tv' && createdBy && (
            <div>
              <h3 className='font-semibold text-base md:text-xl'>
                {typeof createdBy[0] === 'string'
                  ? createdBy[0]
                  : createdBy[0]?.name}
              </h3>
              <p className='text-muted-foreground'>Criador</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
