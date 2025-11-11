import { useParams } from 'react-router'
import { KeywordPage } from '@/views/layout/keywordPage'

const SeriesByKeyword = () => {
  const { keyword } = useParams()

  return <KeywordPage keywordId={keyword || ''} mediaType='tv' />
}

export default SeriesByKeyword
