import { Link } from 'react-router'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { MediaImage } from '../MediaImage'

interface ICreditPersonCardProps {
  credit: {
    id: number
    title?: string
    name?: string
    job?: string
    poster_path: string | null
    media_type: 'movie' | 'tv'
    character?: string
  }
}

export const CreditPersonCard = ({ credit }: ICreditPersonCardProps) => {
  return (
    <Link
      to={`/people/${credit.id}`} // Link para página da pessoa
      className='block w-full group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800'
    >
      {/* Container da imagem */}
      <div className='aspect-2/3 overflow-hidden'>
        <MediaImage
          src={getImageUrl({ path: credit.poster_path, size: 'W500' })}
          alt={credit.title || credit.name || 'Poster'}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
          containerClassName='w-full h-full'
        />
      </div>

      {/* Container do título */}
      <div className='p-3 text-center'>
        <h3 className=' font-semibold text-gray-900 dark:text-white line-clamp-2  group-hover:text-red-600  transition-colors duration-200'>
          {credit.title || credit.name}
        </h3>
        <p className='text-sm italic text-gray-400'>
          {credit.character || credit.job}
        </p>
      </div>
    </Link>
  )
}
