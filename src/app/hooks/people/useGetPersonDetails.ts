import { getPersonData } from '@app/services/people/getPersonDetails'
import { useQuery } from '@tanstack/react-query'

export function useGetPersonDetails(personId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['person', personId],
    queryFn: () => getPersonData(personId),
  })

  console.log(data)

  return {
    personDetails: data,
    isLoading,
    error,
  }
}
