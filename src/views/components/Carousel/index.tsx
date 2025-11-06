import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

interface IGenericCarouselProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  carouselItem?: React.ReactNode
  loop?: boolean
  itemClass?: string
  keyExtractor?: (item: T, index: number) => string | number
}

export const Carousel = <T,>({
  data,
  renderItem,
  loop = true,
  itemClass = 'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6',
  keyExtractor,
  carouselItem,
}: IGenericCarouselProps<T>) => {
  return (
    <BaseCarousel
      opts={{
        loop: loop,
      }}
      className='relative'
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem
            key={keyExtractor ? keyExtractor(item, index) : index}
            className={itemClass}
          >
            {renderItem(item, index)}
          </CarouselItem>
        ))}
        {carouselItem}
      </CarouselContent>
      <CarouselPrevious
        className='left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 cursor-pointer md:w-12 md:h-12 z-50'
        variant='secondary'
      />
      <CarouselNext
        className='right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 cursor-pointer  md:w-12 md:h-12 z-50'
        variant='secondary'
      />
    </BaseCarousel>
  )
}
