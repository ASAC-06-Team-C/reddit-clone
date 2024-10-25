import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

function CommentTextarea({
  setTextOptionState,
  setInputState,
  setText,
  inputValue,
  setInputValue,
  comments,
  currentUserId,
}) {
  const commentRef = useRef(null)

  const commentText = (comments) => {
    const newValue = {
      id: comments.length + 1,
      postId: 123,
      userId: currentUserId,
      content: inputValue,
      date: new Date().toISOString(),
      profileImage: 'https://example.com/example.jpg',
      likes: 5,
      replies: [],
    }
    setText(newValue)
    setInputValue('')
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
        <Button onClick={() => commentText(comments)}>Comment</Button>
      </div>
    </>
  )
}

export default CommentTextarea
