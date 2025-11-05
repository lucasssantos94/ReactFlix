import { useEffect, useRef } from 'react'
import { useGetAllMovies } from '@/app/hooks/movies/useGetAllMovies'
import type { IMovieDetails } from '@/app/types/MovieDetails'
import { ContainerGrid } from '@/views/components/ContainerGrid'
import { MediaCard } from '@/views/components/MediaCard'
import { SkeletonCard } from '@/views/components/SkeletonCard'

const Movies = () => {
  const { movies, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllMovies()

  const loadMoreMoviesRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (!loadMoreMoviesRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries

        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '600px',
      }
    )

    const currentRef = loadMoreMoviesRef.current
    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      <title>ReactFlix - Filmes</title>

      <ContainerGrid>
        {isLoading
          ? Array.from({ length: 10 }).map(() => (
              <SkeletonCard key={Math.random()} />
            ))
          : movies?.map((movie: IMovieDetails, index) => (
              <MediaCard
                key={`${movie.id}-${Math.floor(index / 20)}`}
                media={movie}
              />
            ))}

        {isFetchingNextPage &&
          Array.from({ length: 10 }).map(() => (
            <SkeletonCard key={`skeleton-${Math.random()}`} />
          ))}
      </ContainerGrid>

      <div ref={loadMoreMoviesRef} />
    </>
  )
}

export default Movies
