import { getImageUrl } from '@app/utils/getImageUrl'
import { Button } from '@views/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@views/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Info, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useTrailerStore } from '@/app/stores/useTrailerStore'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import { LoadingSpinner } from '../LoadingSpinner'

interface BannerProps {
  data: IMovieDetails[]
}

const Banner = ({ data = [] }: BannerProps) => {
  const { openModal, isOpen } = useTrailerStore()
  const [isHovered, setIsHovered] = useState(false)

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  useEffect(() => {
    const plugin = autoplayPlugin.current
    if (!plugin) return

    if (isOpen) {
      try {
        plugin.stop()
      } catch (e) {
        console.log(e)
      }
    } else {
      if (!isHovered) {
        try {
          plugin.play()
        } catch (e) {
          console.log(e)
        }
      }
    }
  }, [isOpen, isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    try {
      autoplayPlugin.current?.stop()
    } catch (e) {
      console.log(e)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isOpen) {
      try {
        autoplayPlugin.current?.play()
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (!data || data.length === 0) {
    return <LoadingSpinner />
  }

  const plugins = isOpen ? [] : [autoplayPlugin.current]

  return (
    <Carousel
      plugins={plugins}
      opts={{ loop: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {data.map(movie => (
          <CarouselItem key={movie.id}>
            <div
              className='relative h-[75vh] md:h-[45vh] xl:h-[80vh] w-full overflow-hidden'
              style={{
                backgroundImage: `url(${getImageUrl({
                  media_type: 'backdrop',
                  path: movie.backdrop_path,
                })})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent' />
              <div className='absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent' />

              <div className='absolute top-1/5 left-0 p-4 md:p-8 text-white max-w-2xl'>
                <h2 className='text-4xl md:text-6xl font-bold mb-4 overflow-hidden whitespace-nowrap text-ellipsis'>
                  {movie.title}
                </h2>

                <div className='flex items-center gap-4 text-sm md:text-base mb-4'>
                  <span className='text-green-500 font-bold'>
                    {movie.vote_average
                      ? `${Math.round(movie.vote_average * 10)}% Relevante`
                      : 'Em breve'}
                  </span>
                  <span className='text-gray-300'>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'TBA'}
                  </span>
                  <span className='px-2 py-1 border border-gray-300 text-xs rounded '>
                    {movie.adult ? '18+' : '12+'}
                  </span>
                </div>

                <p className='text-gray-200 leading-relaxed mb-6 line-clamp-3 max-w-[300px] md:max-w-none'>
                  {movie.overview || 'Descrição não disponível.'}
                </p>

                <div className='flex gap-3'>
                  <Button
                    size='lg'
                    onClick={() => openModal(movie.id)}
                    className='bg-white text-black hover:bg-white/90 font-bold gap-2 cursor-pointer'
                  >
                    <Play className='h-4 w-4 md:h-5 md:w-5 fill-current' />
                    Trailer
                  </Button>

                  <Button size='lg' variant='outline' asChild>
                    <Link
                      to={`/movies/${movie.id}`}
                      className='bg-black/50 text-white border-white hover:bg-black/70 gap-2'
                    >
                      <Info className='h-5 w-5' />
                      Ver Detalhes
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovered && (
        <>
          <CarouselPrevious
            className='absolute left-4 top-1/2 -translate-y-1/2 z-10'
            variant='secondary'
          />
          <CarouselNext
            className='absolute right-4 top-1/2 -translate-y-1/2 z-10'
            variant='secondary'
          />
        </>
      )}
    </Carousel>
  )
}

export default Banner
