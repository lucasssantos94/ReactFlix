import { tmdb } from '@app/api/tmdb'

export async function getKeyword(keyword: number) {
  const response = await tmdb.get(`/keyword/${keyword}`)
  return response.data
}
