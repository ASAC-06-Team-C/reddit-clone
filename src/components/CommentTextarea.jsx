import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

function CommentTextarea({
  setTextOptionState,
  setInputState,
  createComment,
  inputValue,
  setInputValue,
  setComments,
  currentUserNo,
}) {
  const commentRef = useRef(null)

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

  const handleResizeHeight = () => {
    commentRef.current.style.height = 'auto'
    commentRef.current.style.height = commentRef.current.scrollHeight + 'px'
  }

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value)
    handleResizeHeight()
  }

  const handleTextOption = () => {
    setTextOptionState((prevState) => !prevState)
  }

  const handleCancel = () => {
    setInputState((prevState) => !prevState)
  }

  return (
    <>
      <Card>
        <textarea
          ref={commentRef}
          value={inputValue}
          rows={1}
          onChange={handleInputChange}
          style={{ height: '24px', width: 'calc(100% - 24px)', outline: 'none', margin: '18px' }}
        />
      </Card>
      <div>
        <Button onClick={handleTextOption}>T</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={() => commentText()}>Comment</Button>
      </div>
    </>
  )
}

export default CommentTextarea
