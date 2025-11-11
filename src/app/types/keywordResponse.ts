import type { IMovieDetails } from './MovieDetails'
import type { ISeriesDetails } from './SerieDetails'

type media = IMovieDetails | ISeriesDetails

export interface IKeywordResponse {
  id: number
  page: number
  results: media[]
  total_pages: number
  total_results: number
}
