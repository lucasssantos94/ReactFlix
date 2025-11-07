import { tmdb } from '@/app/api/tmdb'

export async function getSearch(query: string) {
  const response = await tmdb.get(`/search/multi`, {
    params: {
      query,
    },
  })
  return response.data.results
}
