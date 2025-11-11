import { tmdb } from '@/app/api/tmdb'
import type { IKeywordResponse } from '@/app/types/keywordResponse'

export async function getMovieByKeyword(keyword: string, page: number = 1) {
  const response = await tmdb.get<IKeywordResponse>(`/discover/movie`, {
    params: {
      with_keywords: keyword,
      page,
      language: 'pt-BR',
    },
  })
  return response.data
}

export async function getSerieByKeyword(keyword: string, page: number = 1) {
  const response = await tmdb.get<IKeywordResponse>(`/discover/tv`, {
    params: {
      with_keywords: keyword,
      page,
      language: 'pt-BR',
    },
  })
  return response.data
}
