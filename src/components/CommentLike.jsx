import { useState } from 'react'
import { Button } from '@/components/ui/button'

function CommentLike({ like }) {
  const [likes, setLikes] = useState(like)
  const [likeState, setLikeState] = useState(false)
  const [hateState, setHateState] = useState(false)

  const handleLike = () => {
    if (likeState) {
      setLikes(likes - 1)
      setLikeState(false)
    } else {
      setLikes(likes + (hateState ? 2 : 1))
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
