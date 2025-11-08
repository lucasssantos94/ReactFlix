export interface IPersonDetails {
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string | null
  gender: number
  homepage: string
  id: number
  imdb_id: string
  known_for_department: string
  place_of_birth: string
  name: string
  profile_path: string | null
  popularity: number
  known_for?: Array<{
    id: number
    title?: string
    name?: string
    media_type: string
    poster_path?: string
  }>
}

export interface ICredit {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv'
  poster_path: string | null
  character: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  popularity: number
  job?: string
  department?: string
  credit_id: string
}

export interface ICombinedCredits {
  cast: ICredit[]
  crew: ICredit[]
}
