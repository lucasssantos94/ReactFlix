import { useParams } from 'react-router'
import type { IPersonDetails } from '@/app/types/PersonDetails'
import { PersonSearchedCard } from '@/views/components/PersonSearchedCard'
import { useSearch } from './useSearch'

const PeopleSearch = () => {
  const { search } = useParams()
  const { people } = useSearch(search || '')

  return (
    <div className='flex flex-col gap-4'>
      {people.length > 0 ? (
        people?.map((person: IPersonDetails) => (
          <PersonSearchedCard key={person.id} person={person} />
        ))
      ) : (
        <p>Nenhuma pessoa encontrada</p>
      )}
    </div>
  )
}

export default PeopleSearch
