import { tmdb } from '@/app/api/tmdb'
import type {
  ICombinedCredits,
  IPersonDetails,
} from '@/app/types/PersonDetails'

export async function getPersonDetails(personId: string) {
  const { data } = await tmdb.get<IPersonDetails>(`/person/${personId}`)

  return data
}

export async function getPersonCombinedCredits(personId: string) {
  const { data } = await tmdb.get<ICombinedCredits>(
    `/person/${personId}/combined_credits`
  )
  return data
}

export async function getPersonData(personId: string) {
  const [details, credits] = await Promise.all([
    getPersonDetails(personId),
    getPersonCombinedCredits(personId),
  ])

  return { details, credits }
}
