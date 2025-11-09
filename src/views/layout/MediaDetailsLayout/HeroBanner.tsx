import { useMediaInfo } from '@app/hooks/media/useMediaDetails'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'

interface HeroBannerProps {
  children?: React.ReactNode
}

export const HeroBanner = ({ children }: HeroBannerProps) => {
  const mediaInfo = useMediaInfo()
  const mobile = useIsMobile()

  if (!mediaInfo) {
    return <LoadingSpinner />
  }
  const { backdrop_path } = mediaInfo

  if (!backdrop_path) {
    return (
      <header className='w-full h-[80vh] md:h-[70vh] flex items-center bg-gray-900'>
        <div className='container mx-auto p-6'>{children}</div>
      </header>
    )
  }

  return (
    <header
      className='w-full h-[80vh] md:h-[75vh] flex items-center bg-cover bg-center'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.9)), url(${getImageUrl(
          {
            path: backdrop_path,
            size: mobile ? 'W1280' : 'ORIGINAL',
          }
        )})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </header>
  )
}
