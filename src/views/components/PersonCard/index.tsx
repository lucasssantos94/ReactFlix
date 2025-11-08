import type { IPersonDetails } from '@app/types/PersonDetails'
import { Link } from 'react-router'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { MediaImage } from '../MediaImage'

interface IPersonCardProps {
  person: IPersonDetails
}

export const PersonCard = ({ person }: IPersonCardProps) => {
  const personLink = `/people/${person.id}`
  const knownFor = person.known_for || []
  const topWorks: Array<{ id: number; title: string }> = knownFor
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      title: item.title || item.name || 'Unknown',
    }))

  return (
    <Link to={personLink} className='block w-full max-w-[315px]'>
      <div className='group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 overflow-hidden hover:-translate-y-1 w-full'>
        {/* Image Container */}
        <div className='relative w-full aspect-3/4 overflow-hidden bg-gray-100 dark:bg-gray-700'>
          <MediaImage
            src={getImageUrl({
              path: person.profile_path,
              size: 'PROFILE_MEDIUM',
            })}
            alt={person.name}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
            containerClassName='w-full h-full'
          />

          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
        </div>

        <div className='p-4 space-y-2'>
          <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-300 text-base text-center line-clamp-2 min-h-10 flex items-center justify-center'>
            {person.name}
          </h3>

          <div className='space-y-1'>
            {topWorks.map(work => (
              <p
                key={work.id}
                className='text-sm text-gray-600 dark:text-gray-400 text-center leading-tight line-clamp-1 px-1'
              >
                {work.title}
              </p>
            ))}
          </div>
        </div>

        <div className='w-0 group-hover:w-full h-0.5 bg-red-500 transition-all duration-300 mx-auto' />
      </div>
    </Link>
  )
}
