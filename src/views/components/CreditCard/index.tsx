import { Link } from 'react-router'
import { getImageUrl } from '@/app/utils/getImageUrl'

interface ICreditCardProps {
  credit: {
    id: number
    title?: string
    name?: string
    poster_path: string | null
    media_type: 'movie' | 'tv'
  }
}

export const CreditCard = ({ credit }: ICreditCardProps) => {
  return (
    <Link
      to={
        credit.media_type === 'movie'
          ? `/movies/${credit.id}`
          : `/series/${credit.id}`
      }
      className=' w-full md:w-[250px] group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer '
    >
      {/* Container da imagem */}
      <div className=' overflow-hidden'>
        <img
          src={getImageUrl({ path: credit.poster_path })}
          alt={credit.title || credit.name || 'Poster'}
          className='w-full h-full object-cover  transition-transform duration-300 rounded-lg'
        />
      </div>

      <div className='p-3'>
        <h3 className='text-sm font-semibold  line-clamp-2 text-center transition-colors duration-200'>
          {credit.title || credit.name}
        </h3>
      </div>
    </Link>
  )
}
