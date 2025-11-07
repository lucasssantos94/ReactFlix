import { Suspense } from 'react'
import { NavLink, Outlet, useParams } from 'react-router'
import { Loading } from '@/views/components/Loading'
import { LoadingSpinner } from '@/views/components/LoadingSpinner'
import { useSearch } from './useSearch'

const Search = () => {
  const { search } = useParams()
  const { searchData, movies, series, people, isLoading, error } = useSearch(
    search || ''
  )

  const itemsSearch = [
    { name: 'Filmes', data: movies, path: `/search/${search}/movies` },
    { name: 'Series', data: series, path: `/search/${search}/series` },
    { name: 'Pessoas', data: people, path: `/search/${search}/people` },
  ]

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Erro ao realizar pesquisa</div>
  if (!searchData) return <div>Sem resultados</div>

  console.log(searchData)
  return (
    <section className='container mx-auto grid grid-cols-1 md:grid-cols-[25%_75%] gap-8 p-6'>
      <div className='h-[200px] min-h-[200px] rounded-lg border border-gray-700'>
        <div className='bg-gray-700/50 rounded-t-lg p-4 border-b border-gray-700'>
          <h2>Resultados para {search}</h2>
        </div>
        <div className=''>
          {itemsSearch.map(item => (
            <NavLink
              key={item.name}
              className={({ isActive }) => `
                ${
                  isActive ? 'bg-gray-700/50 font-bold' : ''
                } flex justify-between items-center hover:bg-gray-700/50 px-4 py-2`}
              to={item.path}
            >
              <h3>{item.name}</h3>
              <span>{item.data.length}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  )
}

export default Search
