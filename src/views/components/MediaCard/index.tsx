import { useState } from 'react'
import { Link } from 'react-router'
import type { IMovieDetails } from '@/app/types/MovieDetails'

import type { ISeriesDetails } from '@/app/types/SerieDetails'
import { MediaImage } from '../MediaImage'
import { Button } from '../ui/button'

type MediaType = IMovieDetails | ISeriesDetails

interface MediaCardProps {
  media: MediaType
  scale?: boolean
  size?: 'default' | 'compact'
}

export const MediaCard = ({
  media,
  scale = true,
  size = 'default',
}: MediaCardProps) => {
  const [isActive, setIsActive] = useState(false)

  const isMovie = 'title' in media
  const mediaTitle = isMovie ? media.title : media.name
  const mediaYear = isMovie
    ? media.release_date?.split('-')[0]
    : media.first_air_date?.split('-')[0]

  const handleInteraction = (active: boolean) => {
    setIsActive(active)
  }

  // Tamanhos baseados no prop 'size'
  const cardClasses = {
    default: {
      container: 'w-full max-w-sm',
      image: 'h-96',
      content: 'p-4',
    },
    compact: {
      container: 'w-full max-w-xs',
      image: 'h-80',
      content: 'p-3',
    },
  }[size]

  return (
    <article
      className={`group relative ${cardClasses.container}`}
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      onTouchStart={() => handleInteraction(!isActive)}
    >
      <div
        className={`
          relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700
          transition-all duration-300 ease-out w-full
          ${isActive ? 'z-30 shadow-2xl' : ''}
          ${scale && isActive ? 'md:scale-105' : ''}
          hover:border-gray-500
        `}
      >
        <div
          className={`
            absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent
            transition-opacity duration-300 z-10
            ${isActive ? 'opacity-100' : 'opacity-70'}
          `}
        />

        <MediaImage
          src={media.poster_path}
          alt={mediaTitle || 'Capa da mídia'}
          size={isActive ? 'W780' : 'W500'}
          className={`
            transition-all duration-500
            ${isActive ? 'scale-105' : 'scale-100'}
          `}
          containerClassName={cardClasses.image}
        />

        <div
          className={`
            absolute inset-0 ${
              cardClasses.content
            } transform transition-all duration-300 z-20
            flex flex-col justify-end
            ${
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }
          `}
        >
          <div className='space-y-3'>
            <div>
              <h3 className='text-white font-bold text-lg leading-tight mb-2 line-clamp-2'>
                {mediaTitle}
              </h3>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <span className='text-yellow-400'>⭐</span>
                  <span className='text-white font-bold'>
                    {media.vote_average?.toFixed(1)}
                  </span>
                </div>
                <span className='text-gray-300 text-sm font-medium'>
                  {mediaYear}
                </span>
              </div>
            </div>

            {media.overview && (
              <p className='text-gray-300 text-sm leading-relaxed line-clamp-3'>
                {media.overview}
              </p>
            )}

            <Link
              to={isMovie ? `/movies/${media.id}` : `/series/${media.id}`}
              className='block'
            >
              <Button
                className='w-full cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition-colors'
                size='sm'
              >
                Ver Detalhes
              </Button>
            </Link>
          </div>
        </div>

        <div
          className={`
            ${cardClasses.content} transition-opacity duration-300
            ${isActive ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <div className='space-y-2'>
            <h3 className='text-white font-semibold text-base truncate'>
              {mediaTitle}
            </h3>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-1'>
                <span className='text-yellow-400 text-sm'>⭐</span>
                <span className='text-white text-sm font-medium'>
                  {media.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className='text-gray-400 text-xs'>{mediaYear}</span>
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <Button
          className='fixed inset-0 z-20 md:hidden bg-black/50'
          onClick={() => setIsActive(false)}
        />
      )}
    </article>
  )
}
