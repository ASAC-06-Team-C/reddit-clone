import CommentInput from '@/components/CommentInput'
import CommentTextarea from '@/components/CommentTextarea'
import CommentMarkdown from '@/components/CommentMarkdown'
import CommentSearchBar from '@/components/CommentSearchBar'
import CommentList from '@/components/CommentList'

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
      const response = await fetch('http://localhost:8080/comments', {
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
      await fetch('http://localhost:8080/comments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      const removeComment = (comments) => {
        return comments.reduce((cumulativeComment, currentComment) => {
          if (currentComment.commentNo === commentData.comment_no) {
            return cumulativeComment
          }

          const updatedComment = {
            ...currentComment,
            replies: currentComment.replies ? removeComment(currentComment.replies) : [],
          }

          return [...cumulativeComment, updatedComment]
        }, [])
      }

      setComments((prevComments) => removeComment(prevComments))
    } catch (error) {
      console.error('Error deleteComment: ', error)
    }
  }

  // 댓글 수정
  const updateComment = async (commentData) => {
    try {
      await fetch('http://localhost:8080/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })

      const updatedComments = comments.map((comment) =>
        comment.commentNo === commentData.commentNo
          ? { ...comment, commentContent: commentData.commentContent }
          : comment,
      )
      setComments(updatedComments)
    } catch (error) {
      console.log('Error updateComment: ', error)
    }
  }

  // 댓글 투표
  const voteComment = async (commentData) => {
    try {
      await fetch('http://localhost:8080/comments/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
      setComments((prevComments) => {
        return prevComments.map((comment) =>
          comment.commentNo === commentData.commentNo
            ? { ...comment, commentVoteCount: comment.commentVoteCount + 1 }
            : comment,
        )
      })
    } catch (error) {
      console.log('Error voteComment: ', error)
    }
  }

  const commonProps = {
    currentUserNo,
    inputValue,
    setInputValue,
    setInputState,
    createComment,
    setTextOptionState,
    setComments,
  }

  return (
    <>
      {searchState ? (
        inputState ? (
          <CommentInput setInputState={setInputState} />
        ) : textOptionState ? (
          <CommentTextarea {...commonProps} />
        ) : (
          <CommentMarkdown {...commonProps} />
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
