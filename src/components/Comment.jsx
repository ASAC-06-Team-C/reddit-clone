import CommentInput from '@/components/CommentInput'
import CommentTextarea from '@/components/CommentTextarea'
import CommentMarkdown from '@/components/CommentMarkdown'
import CommentSearchBar from '@/components/CommentSearchBar'
import CommentList from '@/components/CommentList'
import commentDummy from '../mock/CommentDummy.json'

import { useState, useEffect } from 'react'

function Comment() {
  const currentUserId = 0

  const [inputState, setInputState] = useState(true)
  const [textOptionState, setTextOptionState] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [text, setText] = useState(null)
  const [searchState, setSearchState] = useState(true)
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(commentDummy)
  }, [])

  useEffect(() => {
    if (text) setComments((prev) => [...prev, text])
    setText(null)
  }, [text])

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  const commonProps = {
    currentUserId,
    inputValue,
    setInputValue,
    setInputState,
    setText,
    comments,
    setComments,
  }

  return (
    <>
      {searchState ? (
        inputState ? (
          <CommentInput setInputState={setInputState} />
        ) : textOptionState ? (
          <CommentTextarea {...commonProps} setTextOptionState={setTextOptionState} />
        ) : (
          <CommentMarkdown {...commonProps} setTextOptionState={setTextOptionState} />
        )
      ) : null}
      <br />
      <CommentSearchBar setSearchState={setSearchState} searchState={searchState} />
      <CommentList
        comments={comments}
        deleteComment={deleteComment}
        setComments={setComments}
        currentUserId={currentUserId}
      />
    </>
  )
}

export default Comment
