import { Search } from 'lucide-react'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import { useModalSearchStore } from '@/app/stores/useModalSearchStore'
import { Button } from '../ui/button'

export const SearchBtn = () => {
  const { openModal } = useModalSearchStore()
  const isMobile = useIsMobile()
  return (
    <Button
      onClick={openModal}
      variant='ghost'
      className='border cursor-pointer'
    >
      <Search />
      {!isMobile && <span>ctrl + k</span>}
    </Button>
  )
}
