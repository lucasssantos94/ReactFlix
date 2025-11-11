import { Suspense } from 'react'
import { NavLink, Outlet, useParams } from 'react-router'
import { Loading } from '@/views/components/Loading'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { SearchForm } from '@/views/components/SearchForm'
import { useSearch } from './useSearch'

const Search = () => {
  const { search } = useParams()
  const { searchData, movies, series, people, isLoading, error } = useSearch(
    search || ''
  )

  const itemsSearch = [
    { name: 'Filmes', data: movies, path: 'movies' },
    { name: 'Séries', data: series, path: 'series' },
    { name: 'Pessoas', data: people, path: 'people' },
  ]

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Erro ao realizar pesquisa</div>
  if (!searchData) return <div>Sem resultados</div>

  return (
    <section className='container mx-auto grid grid-cols-1 md:grid-cols-[25%_75%] gap-8 p-6 md:px-12'>
      <div className='col-span-full'>
        <SearchForm />
      </div>

      <div className='h-[200px] min-h-[200px] rounded-lg border border-gray-700'>
        <div className='bg-gray-700/50 rounded-t-lg p-4 border-b border-gray-700'>
          <h2>Resultados para {search}</h2>
        </div>
        <div>
          {itemsSearch.map(item => (
            <NavLink
              key={item.name}
              className={({ isActive }) => `
                ${
                  isActive ? 'bg-gray-700/50 font-bold' : ''
                } flex justify-between items-center hover:bg-gray-700/50 px-4 py-2 transition-colors duration-200`}
              to={item.path}
              end={false}
            >
              <h3>{item.name}</h3>
              <span>{item.data.length}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className='min-h-[400px]'>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  )
}

export default Search
