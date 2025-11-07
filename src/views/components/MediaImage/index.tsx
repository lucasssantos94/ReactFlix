// components/MediaImage.tsx
import { useState } from 'react'
import { getImageUrl } from '@/app/utils/getImageUrl'
import type { TMDBImageSize } from '@/app/utils/tmdbImages'

interface MediaImageProps {
  src: string | null | undefined
  alt: string
  size?: TMDBImageSize
  className?: string
  containerClassName?: string
  onLoad?: () => void
  onError?: () => void
  showLoading?: boolean
  fallbackMessage?: string
}

export const MediaImage = ({
  src,
  alt,
  size = 'W500',
  className = '',
  containerClassName = '',
  onLoad,
  onError,
  showLoading = true,
  fallbackMessage = 'Imagem não disponível',
}: MediaImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  return (
    <div className={`relative ${containerClassName} `}>
      {/* Loading State */}
      {showLoading && !imageLoaded && !imageError && (
        <div className='absolute inset-0 bg-gray-700 animate-pulse rounded-lg' />
      )}

      {/* Error State */}
      {imageError ? (
        <div className='flex items-center justify-center bg-gray-800 rounded-lg w-full h-full'>
          <span className='text-gray-400 text-sm text-center px-2'>
            {fallbackMessage}
          </span>
        </div>
      ) : (
        /* Image */
        <img
          src={getImageUrl({ path: src, size })}
          alt={alt}
          className={`
            w-full h-full object-cover transition-all duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          onLoad={handleLoad}
          onError={handleError}
          loading='lazy'
        />
      )}
    </div>
  )
}
