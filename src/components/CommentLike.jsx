import { useState } from 'react'
import { Button } from '@/components/ui/button'

function CommentLike({ like, voteComment, commentNo }) {
  const [likes, setLikes] = useState(like)
  const [likeState, setLikeState] = useState(false)
  const [hateState, setHateState] = useState(false)

  const handleLike = () => {
    if (likeState) {
      setLikes(likes - 1)
      setLikeState(false)
      // voteComment({ comment_no: commentNo, user_no: 1 /*임시 사용자 번호*/, vote_type: 'remove' })
    } else {
      if (hateState) {
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'uptodown' })  
        setLikes(likes + 2)
      } else {
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'up' }) 
        setLikes(likes + 1)
      }
      setLikeState(true)
      setHateState(false)
    }
  }

  const handleHate = () => {
    if (hateState) {
      setLikes(likes + 1)
      setHateState(false)
    } else {
      setLikes(likes - (likeState ? 2 : 1))
      setHateState(true)
      setLikeState(false)
      voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'down' })
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleLike}>👍</button>
      <p style={{ margin: '5px' }}>{likes}</p>
      <button onClick={handleHate}>👎</button>
    </div>
  )
}

export default CommentLike
