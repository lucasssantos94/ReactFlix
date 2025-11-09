import { tmdb } from '@app/api/tmdb'
import type { ICredits } from '@/app/types/MediaBase'

export async function getCastMovie(mediaId: string) {
  const response = await tmdb.get<Promise<ICredits>>(`movie/${mediaId}/credits`)
  return response.data
}

export async function getCastSerie(mediaId: string) {
  const response = await tmdb.get<Promise<ICredits>>(`tv/${mediaId}/credits`)
  return response.data
}
