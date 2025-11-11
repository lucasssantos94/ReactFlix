import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'

import App from '@/App'
import Home from '@/views/pages/Home'

const ErrorPage = lazy(() => import('@/views/pages/Error'))

const Movies = lazy(() => import('@/views/pages/Movies'))
const MovieDetails = lazy(() => import('@/views/pages/MovieDetails'))
const MovieCast = lazy(() => import('@/views/pages/MovieCast'))

const Series = lazy(() => import('@/views/pages/Series'))
const SerieDetails = lazy(() => import('@/views/pages/SerieDetails'))
const SerieCast = lazy(() => import('@/views/pages/SerieCast'))

const People = lazy(() => import('@/views/pages/People'))
const PersonDetails = lazy(() => import('@/views/pages/PersonDetails'))

const Search = lazy(() => import('@/views/pages/Search'))
const MovieSearch = lazy(() => import('@/views/pages/Search/MovieSearch'))
const SerieSearch = lazy(() => import('@/views/pages/Search/SerieSearch'))
const PeopleSearch = lazy(() => import('@/views/pages/Search/PeopleSearch'))
const MoviesByKeyword = lazy(() => import('@/views/pages/MoviesByKeyword'))
const SeriesByKeyword = lazy(() => import('@views/pages/SeriesByKeyword'))

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
        path: '/movies/:movieId/cast',
        element: <MovieCast />,
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
        path: '/series/:serieId/cast',
        element: <SerieCast />,
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
        path: '/search/:search',
        element: <Search />,
        children: [
          {
            index: true,
            element: <Navigate to='movies' replace />,
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
      {
        path: '/keyword/:keyword/movies',
        element: <MoviesByKeyword />,
      },
      {
        path: '/keyword/:keyword/series',
        element: <SeriesByKeyword />,
      },
    ],
  },
])
