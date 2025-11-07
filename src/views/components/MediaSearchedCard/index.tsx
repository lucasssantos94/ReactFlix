import { ArrowUpRight, Calendar, Star } from 'lucide-react'
import { Link } from 'react-router'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import type { ISeriesDetails } from '@/app/types/SerieDetails'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { MediaImage } from '../MediaImage'

interface IMediaSearchedCardProps {
  media: IMovieDetails | ISeriesDetails
}

export const MediaSearchedCard = ({ media }: IMediaSearchedCardProps) => {
  const mediaType = media.title ? 'movie' : 'tv'
  const mediaLink =
    mediaType === 'movie' ? `/movies/${media.id}` : `/series/${media.id}`
  const title = media.title || media.name || ''
  const releaseDate = media.release_date || media.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null
  const rating = media.vote_average
    ? Math.round(media.vote_average * 10) / 10
    : null

  return (
    <Link to={mediaLink}>
      <div className='group  backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-red-500 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/10 overflow-hidden hover:-translate-y-2'>
        <div className='flex gap-6 p-6'>
          {/* Poster Image */}
          <div className='relative w-24 min-w-24 h-36 rounded-xl overflow-hidden shadow-2xl group-hover:shadow-red-500/20 transition-shadow duration-500'>
            <MediaImage
              src={getImageUrl({
                path: media.poster_path,
                size: 'CARD_SMALL',
              })}
              alt={title}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
              containerClassName='w-full h-full'
            />

            {/* Rating Badge */}
            {rating && (
              <div className='absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1'>
                <Star className='w-3 h-3 fill-yellow-400' />
                {rating}
              </div>
            )}

            {/* Hover Arrow */}
            <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
              <ArrowUpRight className='w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500' />
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0 py-1'>
            {/* Header */}
            <div className='flex items-start justify-between mb-3'>
              <div className='flex-1 min-w-0'>
                <h3 className='text-xl font-bold  group-hover:text-red-500 transition-colors duration-300 truncate pr-4'>
                  {title}
                </h3>

                <div className='flex items-center gap-4 mt-2'>
                  {year && (
                    <div className='flex items-center gap-1 text-gray-400 font-semibold text-sm'>
                      <Calendar className='w-4 h-4' />
                      <span>{year}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Overview */}
            <p className='leading-relaxed line-clamp-3  transition-colors duration-300'>
              {media.overview || 'Descrição não disponível.'}
            </p>

            {/* Additional Info */}
            <div className='flex items-center gap-4 mt-4 pt-4 border-t border-gray-700/50'>
              {media.vote_count && (
                <span className='text-xs text-gray-500'>
                  {media.vote_count.toLocaleString()} votos
                </span>
              )}

              {/* Popularity Indicator */}
              {media.popularity && (
                <div className='flex items-center gap-1'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <span className='text-xs text-gray-500'>
                    {Math.round(media.popularity)} popularidade
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gradient Border Bottom */}
        <div className='h-1 bg-linear-to-r from-red-500/0 via-red-400/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
      </div>
    </Link>
  )
}
