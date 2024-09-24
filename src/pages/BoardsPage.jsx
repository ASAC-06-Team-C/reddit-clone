import Board from '@/components/Board'
import Header from '@/components/header'
import Post from '@/components/Post'
import RedditFirstAttachPage from '@/components/RedditFirstAttach'

function BoardsPage() {
  return (
    <>
      <RedditFirstAttachPage />
      <Board />
    </>
  )
}

export default BoardsPage
