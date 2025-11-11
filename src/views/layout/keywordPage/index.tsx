import { useGetMovieByKeyword } from '@app/hooks/media/useGetMediaByKeyword'
import { useEffect, useRef } from 'react'
import { useGetKeyword } from '@/app/hooks/media/useGetKeyword'
import { useGetSerieByKeyword } from '@/app/hooks/media/useGetMediaByKeyword'
import { MediaSearchedCard } from '@/views/components/MediaSearchedCard'
import { SkeletonCard } from '@/views/components/SkeletonCard'

interface IKeywordPageProps {
  keywordId: string
  mediaType: 'movie' | 'tv'
}

export const KeywordPage = ({ keywordId, mediaType }: IKeywordPageProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    mediaByKeyword,
    totalResults,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } =
    mediaType === 'movie'
      ? useGetMovieByKeyword(keywordId)
      : useGetSerieByKeyword(keywordId)

  const mediaList = mediaByKeyword

  const { keywordData } = useGetKeyword(Number(keywordId))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '300px',
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <div className='bg-gray-800'>
        <div className='container mx-auto py-6 flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>{keywordData?.name}</h2>
          <h2 className='font-bold text-2xl'>
            {totalResults} {mediaType === 'movie' ? 'Filmes' : 'Séries'}
          </h2>
        </div>
      </div>

      <section className='container mx-auto mt-8'>
        <div className='flex flex-col gap-4'>
          {mediaList.map(media => (
            <MediaSearchedCard key={media.id} media={media} />
          ))}
        </div>

        <div ref={loadMoreRef} className='h-50 mt-4 '>
          {isFetchingNextPage && <SkeletonCard />}
        </div>
      </section>
    </>
  )
}
