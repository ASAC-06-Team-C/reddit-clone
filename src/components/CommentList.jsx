import CommentLike from '@/components/CommentLike'
import { Viewer } from '@toast-ui/react-editor'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toCamelCase, formatDate } from '@/components/Comment'
import CommentTextarea from './CommentTextarea'
import { MAIN_DOMAIN, PATH_POSTS, PATH_COMMENTS } from '@/constants/API'

const CommentItem = ({
  comment,
  addReply,
  deleteComment,
  currentUserNo,
  updateComment,
  voteComment,
}) => {
  const [replyText, setReplyText] = useState('')

  return (
    <div style={{ marginLeft: comment.commentDepth * 25, marginBottom: '30px' }}>
      <CommentHeader comment={comment} />
      <CommentActions
        comment={comment}
        currentUserNo={currentUserNo}
        deleteComment={deleteComment}
        addReply={addReply}
        replyText={replyText}
        setReplyText={setReplyText}
        updateComment={updateComment}
        voteComment={voteComment}
      />
      {comment.reply?.map((reply) => (
        <CommentItem
          key={reply.commentNo}
          comment={reply}
          addReply={addReply}
          deleteComment={deleteComment}
          currentUserNo={currentUserNo}
          updateComment={updateComment}
          voteComment={voteComment}
        />
      ))}
    </div>
  )
}

const CommentHeader = ({ comment }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={comment.userProfile}
      style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '20px' }}
    />
    <span>{comment.userNickname || 'Name'}</span>
    <span style={{ marginLeft: '15px' }}>{formatDate(comment.commentWriteDate)}</span>
  </div>
)

const CommentActions = ({
  comment,
  currentUserNo,
  deleteComment,
  addReply,
  replyText,
  setReplyText,
  updateComment,
  voteComment,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isReply, setIsReply] = useState(false)
  const [textOptionState, setTextOptionState] = useState(true)
  const [inputValute, setInputValue] = useState(comment.commentContent)

  const handleTextOption = () => {
    setTextOptionState((prevState) => !prevState)
  }

  const handleCancel = () => {
    if (isEditing) setIsEditing((prevState) => !prevState)
    if (isReply) setIsReply((prevState) => !prevState)
  }

  // const handleReply = () => {
  //   if (replyText.trim()) {
  //     addReply(comment.commentNo, replyText)
  //     setReplyText('')
  //   }
  // }

  const handleReply = () => {
    setInputValue('')
    setIsReply(true)
  }

  const handleComment = () => {
    if (inputValute.trim() && isEditing) {
      updateComment({
        user_no: currentUserNo,
        comment_no: comment.commentNo,
        comment_content: inputValute,
      })
      setIsEditing(false)
    } else if (inputValute.trim()) {
      addReply(comment.commentNo, inputValute)
      setIsReply(false)
    }
  }

  return (
    <>
      {comment.userNo === currentUserNo && (
        <>
          {isEditing || isReply ? (
            <>
              {/* <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)} /> */}
              <div>
                <CommentTextarea inputValue={inputValute} setInputValue={setInputValue} />
              </div>
              {/* <Button onClick={handleUpdate}>저장</Button>
              <Button onClick={() => setIsEditing(false)}>취소</Button> */}
              <div>
                <Button onClick={handleTextOption}>T</Button>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={() => handleComment()}>Comment</Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Viewer key={comment.commentContent} initialValue={comment.commentContent} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CommentLike
                  like={comment.commentVoteCount}
                  voteComment={voteComment}
                  commentNo={comment.commentNo}
                />
                <Button onClick={() => setIsEditing(true)}>수정</Button>
                <Button onClick={() => deleteComment(comment)}>삭제</Button>
                <Button onClick={handleReply}>답글</Button>
                {/* <Button onClick={handleReply}>답글</Button> */}
                {/* <input
                  type='text'
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder='답글 입력'
                  style={{ marginLeft: '10px' }}
                /> */}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

function CommentList({
  comments,
  deleteComment,
  currentUserNo,
  setComments,
  createComment,
  updateComment,
  voteComment,
}) {
  useEffect(() => {
    getComment()
  }, [])

  // 댓글 get
  const getComment = async () => {
    try {
      const response = await fetch(
        `${MAIN_DOMAIN + PATH_COMMENTS}?post_no=4&sort_type=asc&post_comment_count=10&comment_page=2`,
      )
      const responseComment = (await response.json()).map(toCamelCase)
      setComments(commentTree(responseComment))
    } catch (error) {
      console.error('Error getComment: ', error)
    }
  }

  const commentTree = (comments) => {
    const map = {}
    const tree = []

    comments.forEach((comment) => {
      comment.reply = []
      map[comment.commentNo] = comment

      if (comment.commentDeleted) {
        comment.commentContent = '삭제된 댓글입니다.'
        comment.userNickname = '[deleted]'
      }
      if (comment.commentMother === 0) {
        tree.push(comment) // 최상위 댓글이면 루트로 추가
      } else {
        const parent = map[comment.commentMother]
        if (parent) {
          parent.reply.push(comment) // 부모 댓글의 reply에 추가
        }
      }
    })

    return tree
  }

  const addReply = async (motherNo, text) => {
    // 재귀적으로 댓글을 찾는 함수
    const findComment = (comments, targetNo) => {
      for (let comment of comments) {
        if (comment.commentNo === targetNo) {
          return comment
        }
        if (comment.reply && comment.reply.length > 0) {
          const found = findComment(comment.reply, targetNo)
          if (found) return found
        }
      }

      return null
    }

    const parentComment = findComment(comments, motherNo)

    if (!parentComment) {
      return
    }

    const newComment = {
      user_no: currentUserNo,
      comment_content: text,
      comment_mother: motherNo,
      comment_depth: parentComment.commentDepth + 1,
      post_no: 4, // 예시로 설정
    }

    try {
      const createdComment = await createComment(newComment)

      // 재귀적으로 댓글 트리를 업데이트하는 함수
      const updateCommentTree = (comments) => {
        return comments.map((comment) => {
          if (comment.commentNo === motherNo) {
            return {
              ...comment,
              reply: [...(comment.reply || []), createdComment],
            }
          }
          if (comment.reply && comment.reply.length > 0) {
            return {
              ...comment,
              reply: updateCommentTree(comment.reply),
            }
          }

          return comment
        })
      }

      setComments((prevComments) => updateCommentTree(prevComments))
    } catch (error) {
      console.error('Error reply:', error)
    }
  }

  return (
    <div>
      <h1>댓글 목록</h1>
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentNo}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
          currentUserNo={currentUserNo}
          updateComment={updateComment}
          voteComment={voteComment}
        />
      ))}
    </div>
  )
}

export default CommentList
