export interface IPersonDetails {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  known_for?: Array<{
    id: number
    title?: string
    name?: string
    media_type: string
    poster_path?: string
  }>
  popularity: number
  gender: number // 1 = Feminino, 2 = Masculino
  adult: boolean
}
