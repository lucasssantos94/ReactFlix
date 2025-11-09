// TrailerModal.tsx
import { useGetMediaTrailer } from '@app/hooks/media/useGetMediaTrailer'
import { useTrailerStore } from '@app/stores/useTrailerStore'
import { Loading } from '../Loading'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'

export const TrailerModal = () => {
  const { isOpen, mediaId, mediaType, closeModal } = useTrailerStore()

  const { trailer, isLoading } = useGetMediaTrailer(
    mediaId || undefined,
    mediaType || 'movie'
  )

  if (!mediaId) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='min-w-full md:min-w-[70%] min-h-[300px] p-0'>
        <DialogTitle className='text-white text-lg font-semibold m-0 p-4 sr-only'>
          {trailer?.name || 'Trailer'}
        </DialogTitle>
        <DialogDescription className='sr-only'>
          Trailer do filme
        </DialogDescription>

        {isLoading && (
          <div className='flex items-center justify-center min-h-[300px]'>
            <Loading />
          </div>
        )}

        {!isLoading && trailer && (
          <div className='w-full h-full'>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1&fs=1`}
              title={trailer.name || 'Trailer do filme'}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen'
              style={{ width: '100%', height: '70vh' }}
              allowFullScreen
            />
          </div>
        )}

        {!isLoading && !trailer && (
          <div className='flex items-center justify-center min-h-[300px] text-white'>
            <p>Trailer não disponível</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
