import CommentInput from '@/components/CommentInput'
import CommentTextarea from '@/components/CommentTextarea'
import CommentMarkdown from '@/components/CommentMarkdown'
import CommentSearchBar from '@/components/CommentSearchBar'
import CommentList from '@/components/CommentList'
import { MAIN_DOMAIN, PATH_POSTS, PATH_COMMENTS } from '@/constants/API'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const toCamelCase = (obj) => {
  const result = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase())
      result[camelKey] = obj[key]
    }
  }

  return result
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

function Comment() {
  const currentUserNo = 20 // 현재 사용자의 번호를 설정

  const [inputState, setInputState] = useState(true)
  const [textOptionState, setTextOptionState] = useState(true)
  const [inputValue, setInputValue] = useState('')

  const [comments, setComments] = useState([])
  const [searchState, setSearchState] = useState(true)

  // 댓글 생성
  const createComment = async (commentData) => {
    try {
      const response = await fetch(`${MAIN_DOMAIN + PATH_COMMENTS}`, {
        // const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      const responseComment = toCamelCase(await response.json())
      return responseComment
    } catch (error) {
      console.error('Error createComment: ', error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (commentData) => {
    try {
      await fetch(`${MAIN_DOMAIN + PATH_COMMENTS}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_no: currentUserNo, comment_no: commentData.commentNo }),
      })

      const deletedComment = (comments) => {
        return comments.map((comment) => {
          if (comment.commentNo === commentData.commentNo) {
            return {
              ...comment,
              commentContent: '삭제된 댓글입니다.',
              userNickname: '[x]',
              commentDeleted: true,
            }
          }
          if (comment.reply && comment.reply.length > 0) {
            return {
              ...comment,
              reply: deletedComment(comment.reply),
            }
          }
          return comment
        })
      }

      setComments((prevComments) => deletedComment(prevComments))
    } catch (error) {
      console.error('Error deleteComment: ', error)
    }
  }

  // 댓글 수정
  const updateComment = async (commentData) => {
    try {
      await fetch(`${MAIN_DOMAIN + PATH_COMMENTS}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      const updatedComment = (comments) => {
        return comments.map((comment) => {
          if (comment.commentNo === commentData.comment_no) {
            return {
              ...comment,
              commentContent: commentData.comment_content,
            }
          }
          if (comment.reply && comment.reply.length > 0) {
            return {
              ...comment,
              reply: updatedComment(comment.reply),
            }
          }
          return comment
        })
      }

      setComments((prevComments) => updatedComment(prevComments))
    } catch (error) {
      console.log('Error updateComment: ', error)
    }
  }

  // 댓글 투표
  const voteComment = async (commentData) => {
    try {
      await fetch(`${MAIN_DOMAIN + PATH_COMMENTS}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      setComments((prevComments) => {
        return prevComments.map((comment) =>
          comment.commentNo === commentData.comment_no
            ? { ...comment, commentVoteCount: comment.commentVoteCount + 1 }
            : comment,
        )
      })
    } catch (error) {
      console.log('Error voteComment: ', error)
    }
  }

  // const commonProps = {
  //   currentUserNo,
  //   inputValue,
  //   setInputValue,
  //   setInputState,
  //   createComment,
  //   setTextOptionState,
  //   setComments,
  // }

  const commentText = async () => {
    const newCreateComment = {
      post_no: 4, // 현재 게시물 번호
      user_no: currentUserNo,
      comment_content: inputValue,
      comment_mother: 0,
      comment_depth: 0,
    }

    try {
      const newComment = await createComment(newCreateComment)
      setComments((prevComments) => [...prevComments, newComment])
      setInputValue('')
    } catch (error) {
      console.error('error ', error)
    }
  }

  const handleTextOption = () => {
    setTextOptionState((prevState) => !prevState)
  }

  const handleCancel = () => {
    setInputState((prevState) => !prevState)
  }

  const [editorState, setEditorState] = useState(true)

  const handleState = (setState) => {
    setState((prev) => !prev)
  }
  // const commonProps = {
  //   inputValue,
  //   setInputValue,
  // }

  return (
    <>
      {searchState ? (
        inputState ? (
          <CommentInput setInputState={setInputState} />
        ) : textOptionState ? (
          <>
            <CommentTextarea inputValue={inputValue} setInputValue={setInputValue} />
            <div>
              <Button onClick={handleTextOption}>T</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={() => commentText()}>Comment</Button>
            </div>
          </>
        ) : (
          <>
            <CommentMarkdown
              inputValue={inputValue}
              setInputValue={setInputValue}
              editorState={editorState}
            />
            <div>
              <Button onClick={handleTextOption}>T</Button>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={() => commentText()}>Comment</Button>
              <Button onClick={() => handleState(setEditorState)}>
                {editorState ? 'Markdown Editor' : 'Back to TextEditor'}
              </Button>
            </div>
          </>
        )
      ) : null}
      <br />
      <CommentSearchBar setSearchState={setSearchState} searchState={searchState} />
      <CommentList
        comments={comments}
        deleteComment={deleteComment}
        setComments={setComments}
        currentUserNo={currentUserNo}
        createComment={createComment}
        updateComment={updateComment}
        voteComment={voteComment}
      />
    </>
  )
}

export default Comment
