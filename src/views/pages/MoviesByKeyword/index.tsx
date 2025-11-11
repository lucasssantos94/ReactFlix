import { useParams } from 'react-router'

import { KeywordPage } from '@/views/layout/keywordPage'

const MoviesByKeyword = () => {
  const { keyword } = useParams()

  return <KeywordPage keywordId={keyword || ''} mediaType='movie' />
}

export default MoviesByKeyword
