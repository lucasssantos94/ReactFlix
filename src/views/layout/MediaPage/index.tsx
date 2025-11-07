import { useEffect, useRef, useState } from 'react'
import { ContainerGrid } from '@/views/components/ContainerGrid'
import { MediaCard, type MediaType } from '@/views/components/MediaCard'
import { SelectGenre } from '@/views/components/SelectGenre'
import { SkeletonCard } from '@/views/components/SkeletonCard'

interface MediaListPageProps<TMedia extends MediaType> {
  title: string
  useGetAllMedia: (genreId: string) => {
    data: TMedia[]
    isLoading: boolean
    fetchNextPage: () => void
    hasNextPage: boolean
    isFetchingNextPage: boolean
  }
  useGetGenres: () => { data: { id: number; name: string }[] | undefined }
}

export function MediaListPage<TMedia extends MediaType>({
  title,
  useGetAllMedia,
  useGetGenres,
}: MediaListPageProps<TMedia>) {
  const [selectedGenreId, setSelectedGenreId] = useState<string>('')

  const {
    data: mediaList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllMedia(selectedGenreId)

  const { data: genres } = useGetGenres()

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleSelectGenre = (genreId: string) => setSelectedGenreId(genreId)

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) fetchNextPage()
      },
      { threshold: 0.1, rootMargin: '600px' }
    )

    const current = loadMoreRef.current
    observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      <title>ReactFlix - {title}</title>
      <div className='mt-8 px-4'>
        <div className='flex items-center gap-8 mb-8'>
          <h1 className='text-3xl font-normal'>{title}</h1>
          <SelectGenre
            genres={genres ?? []}
            selectedGenre={selectedGenreId}
            onGenreChange={handleSelectGenre}
          />
        </div>

        <section>
          <ContainerGrid>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              : mediaList?.map((media, index) => (
                  <MediaCard
                    key={`${media.id}-${Math.floor(index / 20)}`}
                    media={media}
                  />
                ))}

            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={`next-skeleton-${index}`} />
              ))}
          </ContainerGrid>
        </section>

        <div ref={loadMoreRef} />
      </div>
    </>
  )
}
