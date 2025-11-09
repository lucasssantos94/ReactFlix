import { tmdb } from '@/app/api/tmdb'
import type { TMDBVideo, TMDBVideosResponse } from '@/app/types/TMDBVideo'

export async function getMediaTrailer(
  mediaId: number,
  mediaType: 'movie' | 'tv' = 'movie'
): Promise<TMDBVideo | null> {
  const responsePt = await tmdb.get<TMDBVideosResponse>(
    `/${mediaType}/${mediaId}/videos`,
    { params: { language: 'pt-BR' } }
  )
  let videos = responsePt.data.results

  if (!videos?.length) {
    const responseEn = await tmdb.get<TMDBVideosResponse>(
      `/${mediaType}/${mediaId}/videos`,
      { params: { language: 'en-US' } }
    )
    videos = responseEn.data.results
  }

  if (!videos?.length) return null

  const scored = videos
    .filter(v => v.site === 'YouTube')
    .map(v => ({
      ...v,
      score:
        (v.type === 'Trailer' ? 3 : v.type === 'Teaser' ? 2 : 1) +
        (/official|oficial/i.test(v.name) ? 2 : 0) +
        (/HD|4K/i.test(v.name) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)

  return scored[0] || null
}
