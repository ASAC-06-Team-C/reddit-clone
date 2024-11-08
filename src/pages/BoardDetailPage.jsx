import BoardDetail from '@/components/BoardDetail'
import Comment from '@/components/Comment'
function BoardDetailPage() {
  return (
    <div style={{ width: '60%' }}>
      <BoardDetail />
      <br />
      <hr />
      <p style={{ height: '15px' }} />
      <Comment />
    </div>
  )
}
export default BoardDetailPage
