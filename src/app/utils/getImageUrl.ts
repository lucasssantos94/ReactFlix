import { TMDB_IMAGE_SIZES, type TMDBImageSize } from './tmdbImages'

interface IGetImageUrlProps {
  size?: TMDBImageSize
  media_type?: 'backdrop' | 'poster' | 'profile'
  path: string | null | undefined
}

export function getImageUrl({
  size = 'ORIGINAL',
  path,
}: IGetImageUrlProps): string | undefined {
  const sizeValue = TMDB_IMAGE_SIZES[size] || TMDB_IMAGE_SIZES.ORIGINAL

  return `https://image.tmdb.org/t/p/${sizeValue}${path}`
}
