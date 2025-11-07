import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const SearchForm = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/search/${search}`)
  }
  return (
    <form onSubmit={handleSubmit} className='mt-8 flex items-center gap-2'>
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Pesquise por filmes, series ou pessoas'
        className='focus-visible:ring-0 focus-visible:outline-none'
      />
      <Button type='submit' className='cursor-pointer'>
        Buscar
      </Button>
    </form>
  )
}
