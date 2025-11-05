import { tmdb } from '@/app/api/tmdb'
import type { IMoviesResponse } from '@/app/types/MoviesResponse'

export async function getAllMovies(pageParam = 1) {
  const response = await tmdb.get<Promise<IMoviesResponse>>('/movie/popular', {
    params: {
      page: pageParam,
    },
  })
  return response.data
}
