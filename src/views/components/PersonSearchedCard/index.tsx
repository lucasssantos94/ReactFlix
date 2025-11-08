import type { IPersonDetails } from '@app/types/PersonDetails' // Você precisará criar este tipo
import { ArrowUpRight, Film, Star, Users } from 'lucide-react'
import { Link } from 'react-router'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { MediaImage } from '../MediaImage'

interface IPersonSearchedCardProps {
  person: IPersonDetails
}

export const PersonSearchedCard = ({ person }: IPersonSearchedCardProps) => {
  const personLink = `/people/${person.id}`
  const knownFor = person.known_for || []
  const department = person.known_for_department || 'Atuação'

  return (
    <Link to={personLink}>
      <div className='group backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-red-500 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 dark:hover:shadow-cyan-500/10 overflow-hidden hover:-translate-y-1 shadow-lg dark:shadow-none'>
        <div className='flex gap-6 p-6'>
          {/* Profile Image */}
          <div className='relative w-24 min-w-24 h-24 rounded-full overflow-hidden shadow-2xl group-hover:shadow-red-500/20  transition-shadow duration-500 border-2  border-gray-600'>
            <MediaImage
              src={getImageUrl({
                path: person.profile_path,
                size: 'CARD_SMALL',
              })}
              alt={person.name}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
              containerClassName='w-full h-full'
            />

            {/* Hover Arrow */}
            <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent dark:from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
              <ArrowUpRight className='w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500' />
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0 py-1'>
            {/* Header */}
            <div className='flex items-start justify-between mb-3'>
              <div className='flex-1 min-w-0'>
                <h3 className='text-xl font-bold  group-hover:text-red-500 transition-colors duration-300 truncate pr-4'>
                  {person.name}
                </h3>

                <div className='flex items-center gap-4 mt-2 flex-wrap'>
                  <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                    <Film className='w-4 h-4' />
                    <span>{department}</span>
                  </div>

                  {person.popularity && (
                    <div className='flex items-center gap-1 text-amber-600 dark:text-amber-400 text-sm'>
                      <Star className='w-4 h-4 fill-amber-500 dark:fill-amber-400' />
                      <span>{Math.round(person.popularity)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Known For */}
            <div className='mb-4'>
              <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                Conhecido por:
              </h4>
              <div className='flex flex-wrap gap-2'>
                {knownFor.map(item => (
                  <span
                    key={item.id}
                    className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-600'
                  >
                    {item.title || item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className='flex items-center gap-4 mt-4 pt-4 border-t border-gray-700 dark:border-gray-700/50 flex-wrap'>
              {person.known_for?.length && (
                <div className='flex items-center gap-1 text-gray-600 dark:text-gray-500 text-xs'>
                  <Users className='w-3 h-3' />
                  <span>{person.known_for.length} trabalhos conhecidos</span>
                </div>
              )}

              {/* Gender */}
              {person.gender === 1 && (
                <span className='text-xs text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded-full'>
                  Feminino
                </span>
              )}
              {person.gender === 2 && (
                <span className='text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full'>
                  Masculino
                </span>
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
