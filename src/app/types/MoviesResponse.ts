import type { IMovieDetails } from './MovieDetails'

export interface IMoviesResponse {
  page: number
  results: IMovieDetails[]
  total_pages: number
  total_results: number
}
