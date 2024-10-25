import CommentLike from '@/components/CommentLike'
import { Viewer } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import CommentReply from '@/components/CommentReply'

function NowTime(date) {
  const commentDate = new Date(date)
  const dateNow = new Date()
  const second = Math.floor((dateNow - commentDate) / 1000)

  if (second < 60) return `${second} seconds ago`
  if (second < 3600) return `${Math.floor(second / 60)} minutes ago`
  if (second < 86400) return `${Math.floor(second / 3600)} hours ago`
  return `${Math.floor(second / 86400)} days ago`
}

function CommentList({ comments, deleteComment, currentUserId, setComments }) {
  const [replyStates, setReplyStates] = useState({})

  const handleReply = (commentId) => {
    setReplyStates((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const addReply = (parentId, newReply, replyToId = null) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          }
        }

        if (comment.replies.some((reply) => reply.id === replyToId)) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyToId) {
                return {
                  ...reply,
                  replies: [...reply.replies, newReply],
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
      return updatedComments
    })
  }

  const deleteReply = (parentCommentId, replyId) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== replyId), // 답글 삭제
          }
        }
        return comment
      })
      return updatedComments
    })
  }

  function Replies({ replies, parentId }) {
    const [replyStates, setReplyStates] = useState({})

    const handleReply = (replyId) => {
      setReplyStates((prev) => ({
        ...prev,
        [replyId]: !prev[replyId],
      }))
    }

    return (
      <div style={{ marginLeft: '20px' }}>
        {replies.map((reply) => (
          <div key={reply.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={reply.profileImage}
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
              />
              <span>{NowTime(reply.date)}</span>
              <Viewer initialValue={reply.content} />
              <Button onClick={() => handleReply(reply.id)}>
                {replyStates[reply.id] ? '답글 취소' : '답글 달기'}
              </Button>
              {replyStates[reply.id] && (
                <CommentReply
                  onSubmit={(newReply) => addReply(parentId, newReply, reply.id)}
                  currentUserId={currentUserId}
                />
              )}
            </div>
            {reply.replies.length > 0 && <Replies replies={reply.replies} parentId={reply.id} />}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>댓글 목록</h1>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={comment.profileImage}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '20px' }}
            />
            {NowTime(comment.date)}
          </div>
          <Viewer initialValue={comment.content} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CommentLike like={comment.likes} />
            {comment.userId === currentUserId && (
              <Button onClick={() => deleteComment(comment.id)}>삭제</Button>
            )}
            <Button onClick={() => handleReply(comment.id)}>
              {replyStates[comment.id] ? '답글 취소' : '답글 달기'}
            </Button>
          </div>

          {replyStates[comment.id] && (
            <CommentReply
              onSubmit={(newReply) => addReply(comment.id, newReply)}
              currentUserId={currentUserId}
            />
          )}

          <div style={{ margin: '30px' }}>
            {comment.replies.map((reply) => (
              <div key={reply.id}>
                <img
                  src={reply.profileImage}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
                />
                <span>{NowTime(reply.date)}</span>
                <Viewer initialValue={reply.content} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CommentLike like={reply.likes} />
                  {reply.userId === currentUserId && (
                    <Button onClick={() => deleteReply(comment.id, reply.id)}>삭제</Button>
                  )}
                  <Button onClick={() => handleReply(reply.id)}>
                    {replyStates[reply.id] ? '답글 취소' : '답글 달기'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList
