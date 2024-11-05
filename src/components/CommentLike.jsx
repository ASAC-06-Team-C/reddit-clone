import { useState } from 'react'

function CommentLike({ like, voteComment, commentNo }) {
  const [likes, setLikes] = useState(like)
  const [currentVoteType, setCurrentVoteType] = useState('NONE')

  const handleLike = () => {
    if (currentVoteType === 'UP') {
      setLikes(likes - 1)
      setCurrentVoteType('NONE')
      voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'NONE' })
    } else {
      if (currentVoteType === 'DOWN') {
        setLikes(likes + 2)
        setCurrentVoteType('UP')
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'UP' })
      } else {
        setLikes(likes + 1)
        setCurrentVoteType('UP')
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'UP' })
      }
    }
  }

  const handleHate = () => {
    if (currentVoteType === 'DOWN') {
      setLikes(likes + 1)
      setCurrentVoteType('NONE')
      voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'NONE' })
    } else {
      if (currentVoteType === 'UP') {
        setLikes(likes - 2)
        setCurrentVoteType('DOWN')
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'DOWN' })
      } else {
        setLikes(likes - 1)
        setCurrentVoteType('DOWN')
        voteComment({ comment_no: commentNo, user_no: 1, comment_vote_type: 'DOWN' })
      }
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
