import { useMediaInfo } from '@app/hooks/media/useMediaDetails'
import { useEffect } from 'react'
import { useMediaDetailsStore } from '@/app/stores/useMediaDetailsStore'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import type { ISeriesDetails } from '@/app/types/SerieDetails'
import { LoadingSpinner } from '@/views/components/LoadingSpinner' // ✅ Importe o spinner
import { HeroBanner } from './HeroBanner'
import { InfoBanner } from './InfoBanner'

import { SectionInfo } from './SectionInfo'
import { SideBar } from './SideBar'

interface IMediaDetailsLayoutProps {
  media: {
    data: IMovieDetails | ISeriesDetails
    type: 'movie' | 'tv'
  }
}

export const MediaDetailsLayout = ({ media }: IMediaDetailsLayoutProps) => {
  const { setMediaDetails, clearMediaDetails } = useMediaDetailsStore()
  const mediaInfo = useMediaInfo()

  useEffect(() => {
    setMediaDetails(media.data, media.type)

    return () => {
      clearMediaDetails()
    }
  }, [media.data, media.type, setMediaDetails, clearMediaDetails])

  if (!mediaInfo) {
    return <LoadingSpinner />
  }

  const { title } = mediaInfo

  return (
    <>
      <title>{title}</title>
      <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
        <HeroBanner>
          <InfoBanner />
        </HeroBanner>
        <main className=' md:container md:mx-auto md:p-6 grid grid-cols-1 md:grid-cols-[80%_20%] gap-8 mb-10'>
          <SectionInfo />
          <SideBar />
        </main>
      </div>
    </>
  )
}
