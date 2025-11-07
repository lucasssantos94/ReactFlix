import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import App from '@/App'
import Home from '@/views/pages/Home'

const ErrorPage = lazy(() => import('@/views/pages/Error'))

const Movies = lazy(() => import('@/views/pages/Movies'))
const MovieDetails = lazy(() => import('@/views/pages/MovieDetails'))

const Series = lazy(() => import('@/views/pages/Series'))
const SerieDetails = lazy(() => import('@/views/pages/SerieDetails'))

const People = lazy(() => import('@/views/pages/People'))
const PersonDetails = lazy(() => import('@/views/pages/PersonDetails'))

const Search = lazy(() => import('@/views/pages/Search'))
const MovieSearch = lazy(() => import('@/views/pages/Search/MovieSearch'))
const SerieSearch = lazy(() => import('@/views/pages/Search/SerieSearch'))
const PeopleSearch = lazy(() => import('@/views/pages/Search/PeopleSearch'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />,
      },
      {
        path: '/series',
        element: <Series />,
      },
      {
        path: '/series/:serieId',
        element: <SerieDetails />,
      },
      {
        path: '/people',
        element: <People />,
      },
      {
        path: '/people/:personId',
        element: <PersonDetails />,
      },
      {
        path: '/search/:search/',
        element: <Search />,
        children: [
          {
            index: true,
            element: <MovieSearch />,
          },
          {
            path: 'movies',
            element: <MovieSearch />,
          },
          {
            path: 'series',
            element: <SerieSearch />,
          },
          {
            path: 'people',
            element: <PeopleSearch />,
          },
        ],
      },
    ],
  },
])
